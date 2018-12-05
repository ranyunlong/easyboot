import chalk from 'chalk'
import { TClass } from './Module'
import { EasyBootEntityConstructor } from './EasyBootEntity';
import { Validator } from './Router/Route';
import { ElementType } from './Router/ElementType';
import { DecoratorException } from './DecoratorException';

/**
 * Controller decorator
 *
 * The decorator apply to Contorllor.
 *
 * Example
 * ```
 * @Controller
 * export class IndexController {}
 * ```
 */
export function Controller(target: TController): void {
    const options = target.prototype
    options.metadata = Reflect.getMetadata('design:paramtypes', target) || []
    options.metadata.forEach((Service: TClass) => {
        if (!Service.prototype.type || !Service.prototype.token) {
            throw new DecoratorException(`The Service ${chalk.redBright(Service.name)} must use ${chalk.yellowBright('@Service')} decorator.`, Service.name)
        }
    })
    options.type = 'controller'
    // checking routes
    const propertys: Propertys = options.propertys || new Map()
    propertys.forEach((options) => {
        const { routes, params, bodys } = options
        // checking params
        if (params) {
            if (routes instanceof Map) {
                routes.forEach((route) => {
                    if (!/\:/.test(route.path)) {
                        const [first, ...more] = route.method
                        const mapingName = first + more.join('').toLowerCase() + 'Mapping'
                        throw new DecoratorException(`Invalid Decorator @RequestParam, The route ${chalk.yellowBright(`@${mapingName}('${route.path}')`)} is not dynamic routing parameter.`, `@${mapingName}('${route.path}')`)
                    }
                })
            }
        }
        if (bodys) {
            if (routes instanceof Map) {
                routes.forEach((route, key) => {
                    if (/GET|DELETE|HEAD|COPY|PURGE|UNLOCK/.test(key)) {
                        const [first, ...more] = route.method
                        const mapingName = first + more.join('').toLowerCase() + 'Mapping'
                        throw new DecoratorException(`Invalid Decorator @RequestBody must be POST request method, The route ${chalk.yellowBright(`@${mapingName}('${route.path}')`)} is ${route.method} method.`, `@${mapingName}('${route.path}')`)
                    }
                })
            }
        }
    })
}

/**
 * @function createRequestParameterDecorator
 * @param type
 * @param opts
 */
export function createRequestParameterDecorator(type: 'query' | 'body' | 'param', opts: RequestParameterDecoratorOptions = {}): RequestParameterDecorator {
    return function decorator(...args: any) {
        if (args.length === 3) {
            const [target, propertyKey, parameterIndex] = args
            const parameterType = Reflect.getMetadata('design:paramtypes', target, propertyKey)
            const propertys: Propertys = target.propertys || new Map()
            if (propertys.has(propertyKey)) {
                const options = propertys.get(propertyKey) || {}
                const {
                    querys = new Map<number, RequestParameterDecoratorOptions>(),
                    bodys = new Map<number, RequestParameterDecoratorOptions>(),
                    params = new Map<number, RequestParameterDecoratorOptions>()
                } = options
                if (type === 'query') {
                    querys.set(parameterIndex, {
                        ...opts,
                        parameterTypes: parameterType
                    })
                    options.querys = querys
                } else if (type === 'body') {
                    bodys.set(parameterIndex, {
                        ...opts,
                        parameterTypes: parameterType
                    })
                    options.bodys = bodys
                } else if (type === 'param') {
                    params.set(parameterIndex, {
                        ...opts,
                        parameterTypes: parameterType
                    })
                    options.params = params
                }
            } else {
                if (type === 'query') {
                    const querys = new Map()
                    querys.set(parameterIndex, {
                        ...opts,
                        parameterType: parameterType
                    })
                    propertys.set(propertyKey, {
                        querys
                    })
                } else if (type === 'body') {
                    const bodys = new Map()
                    bodys.set(parameterIndex, {
                        ...opts,
                        parameterType: parameterType
                    })
                    propertys.set(propertyKey, {
                        bodys
                    })
                } else if (type === 'param') {
                    const params = new Map()
                    params.set(parameterIndex, {
                        ...opts,
                        parameterType: parameterType
                    })
                    propertys.set(propertyKey, {
                        params
                    })
                }
            }
            target.propertys = propertys
        } else if (args.length === 2) {
            const [keys, validators] = args
            return createRequestParameterDecorator(type, {
                keys,
                validators
            })
        } else if (args.length === 1) {
            const [Entity] = args
            if (typeof Entity === 'string' || Array.isArray(Entity)) {
                return createRequestParameterDecorator(type, {
                    keys: Entity
                })
            } else if (typeof Entity === 'object') {
                return createRequestParameterDecorator(type, {
                    rule: Entity
                })
            } else {
                if (Entity.prototype.type !== 'entity') {
                    throw new DecoratorException(`Invalid Entity, you must be use ${chalk.yellowBright('@Entity')} decorator in class${Entity.name}.`, `${Entity.name}`)
                }
                return createRequestParameterDecorator(type, {
                    Entity
                })
            }
        }
    } as any
}

/**
 * RequestQuery decorator
 *
 * The decorator apply to Contorllor handle function parameter.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     // not validated
 *     @GetMapping('admin')
 *     public async index(@RequestQuery() query: any){}
 *
 *     // use Entity class validate
 *     @GetMapping('test')
 *     public async test(@RequestQuery(UserEntity) query: UserEntity){}
 *
 *     // use custom validate
 *     @GetMapping('test')
 *     public async test(@RequestQuery('name', isString('必须为字符串')) query: UserEntity){}
 * }
 * ```
 */
export const RequestQuery = createRequestParameterDecorator('query')

/**
 * RequestParam decorator
 *
 * The decorator apply to Contorllor handle function parameter.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     // not validated
 *     @GetMapping('admin')
 *     public async index(@RequestParam() query: any){}
 *
 *     // use Entity class validate
 *     @GetMapping('test')
 *     public async test(@RequestParam(UserEntity) query: UserEntity){}
 *
 *     // use custom validate
 *     @GetMapping('test')
 *     public async test(@RequestParam('id', isInt('必须为整数')) query: UserEntity){}
 * }
 * ```
 */
export const RequestParam = createRequestParameterDecorator('param')

/**
 * RequestParam decorator
 *
 * The decorator apply to Contorllor handle function parameter.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     // not validated
 *     @GetMapping('admin')
 *     public async index(@RequestBody() query: any){}
 *
 *     // use Entity class validate
 *     @GetMapping('test')
 *     public async test(@RequestBody(UserEntity) query: UserEntity){}
 *
 *     // use custom validate
 *     @GetMapping('test')
 *     public async test(@RequestBody('username', isString('必须为字符串')) query: UserEntity){}
 * }
 * ```
 */
export const RequestBody = createRequestParameterDecorator('body')

/**
 * RequestMapping decorator
 *
 * The decorator apply to Contorllor or Contorllor propertys, Used to route.
 * Request method ALL (any)
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping('admin/:id')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping('admin/:id')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping(':id')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping(':id/:name')
 * export class IndexController {}
 * ```
 */
export function RequestMapping(path: string, method: ElementType.METHOD = ElementType.METHOD.ALL): RequestMappingDecorator {
    function decorator(...args: any[]): any {
        const [ target, propertyKey, descriptor ] = args
        if (args.length === 1) {
            const options: ControllerOptions = target.prototype
            options.path = path
            options.method = method
        } else {
            // const returnType = Reflect.getMetadata('design:returntype', target, propertyKey);
            const propertys: Propertys = target.propertys || new Map()
            if (propertys.has(propertyKey)) {
                const property = propertys.get(propertyKey)
                const routes = property.routes || new Map()
                const methodName = method.split('')
                const [ first, ...more ] = methodName
                if (!/^async/.test(descriptor.value.toString())) {
                    throw new DecoratorException('Response handle must be async function.', descriptor.value.toString())
                }
                if (routes.has(method)) {
                    throw new DecoratorException(`Decorator is repeat.`, `@${first + more.join('').toLowerCase()}Mapping('${path}')`)
                }
                routes.set(method, {
                        path,
                        method,
                    propertyKey
                })
                property.routes = routes
            } else {
                const routes = new Map() as Routes
                routes.set(method, {
                    path,
                    method,
                    propertyKey
                })
                propertys.set(propertyKey, {
                    routes
                })
            }
            target.propertys = propertys
        }
    }
    return decorator
}

/**
 * GetMapping decorator
 *
 * The decorator apply  Contorllor propertys, Used to route.
 * Request method GET
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function GetMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.GET)
}

/**
 * PostMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method POST
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function PostMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.POST)
}

/**
 * DeleteMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method DELETE
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @DeleteMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function DeleteMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.DELETE)
}

/**
 * CopyMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method COPY
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @CopyMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function CopyMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.COPY)
}

/**
 * HeadMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method HEAD
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @HeadMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function HeadMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.HEAD)
}

/**
 * LinkMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method LINK
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @LinkMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function LinkMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.LINK)
}

/**
 * UnlinkMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method UNLINK
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @UnlinkMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function UnlinkMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.UNLINK)
}

/**
 * OptionsMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method OPTIONS
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @OptionsMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function OptionsMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.OPTIONS)
}

/**
 * PatchMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method PATCH
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PatchMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function PatchMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.PATCH)
}

/**
 * PropfindMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method PROPFIND
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PropfindMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function PropfindMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.PROPFIND)
}

/**
 * PurgeMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method PURGE
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PurgeMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function PurgeMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.PURGE)
}

/**
 * PutMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method PUT
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PutMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function PutMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.PUT)
}

/**
 * LockMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method LOCK
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @LockMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function LockMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.LOCK)
}

/**
 * UnlockMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method UNLOCK
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @UnlockMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function UnlockMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.UNLOCK)
}

/**
 * ViewMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method VIEW
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @ViewMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function ViewMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.VIEW)
}

interface TController {
    new (...args: any[]): any;
}

interface RequestParameterDecorator {
    (Entity: EasyBootEntityConstructor): ParameterDecorator;
    (rule: { [key: string]: Validator | Validator[] | null }): ParameterDecorator;
    (keys: string | string[]): ParameterDecorator;
    (key: string, validator?: Validator | Validator[] | null): ParameterDecorator;
    (target: any, propertyKey: string, parameterIndex: number): void;
}

interface RequestMappingDecorator {
    <T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
    <TFunction extends Function>(target: TFunction): TFunction | void;
}

type Method = ElementType.METHOD;
type propertyKey = string;

export type Routes = Map<Method, {
    path: string;
    propertyKey: string;
    method: Method;
}>;

export type Propertys = Map<PropertyKey, Property>

export interface Property {
    querys?: Map<number, RequestParameterDecoratorOptions>;
    bodys?: Map<number, RequestParameterDecoratorOptions>;
    params?: Map<number, RequestParameterDecoratorOptions>;
    setHeaders?: Map<string, string>;
    getHeaders?: Map<string, string>;
    statusCode?: number;
    routes?: Routes;
    statusMessage?: string;
    contentType?: string;
    exception?: any;
    exceptionCatch?: any;
}

export interface ControllerOptions {
    metadata?: TClass[];
    path?: string;
    method?: Method;
    type?: 'controller';
    propertys: Propertys;
}

export interface RequestParameterDecoratorOptions {
    parameterTypes?: TClass[];
    Entity?: EasyBootEntityConstructor;
    keys?: string | string[];
    validators?: Validator | Validator[];
    rule?: {
        [key: string]: Validator | Validator[] | null;
    }
}