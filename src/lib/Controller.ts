import chalk from 'chalk'
import { TClass } from './Module'
import { EasyBootEntityConstructor } from './EasyBootEntity';
import { MappingDataParams, Validator } from './Router/Route';
import { ElementType } from './Router/ElementType';
import { DecoratorException } from './DecoratorException';

export function Controller(target: { new (...args: any[]): any }): void {
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

interface RequestParameterDecorator {
    (Entity: EasyBootEntityConstructor): ParameterDecorator;
    (rule: { [key: string]: Validator | Validator[] | null }): ParameterDecorator;
    (keys: string | string[]): ParameterDecorator;
    (key: string, validator?: Validator | Validator[] | null): ParameterDecorator;
    (target: any, propertyKey: string, parameterIndex: number): void;
}

export function createRequestParameterDecorator(type: 'query' | 'body' | 'param', opts: RequestParameterDecoratorOptions = {}): RequestParameterDecorator {
    return function decorator(...args: any) {
        if (args.length === 3) {
            const [target, propertyKey, parameterIndex] = args
            const propertys: Propertys = target.propertys || new Map()
            if (propertys.has(propertyKey)) {
                const options = propertys.get(propertyKey) || {}
                const {
                    querys = new Map<number, RequestParameterDecoratorOptions>(),
                    bodys = new Map<number, RequestParameterDecoratorOptions>(),
                    params = new Map<number, RequestParameterDecoratorOptions>()
                } = options
                if (type === 'query') {
                    querys.set(parameterIndex, opts)
                    options.querys = querys
                } else if (type === 'body') {
                    bodys.set(parameterIndex, opts)
                    options.bodys = bodys
                } else if (type === 'param') {
                    params.set(parameterIndex, opts)
                    options.params = params
                }
            } else {
                if (type === 'query') {
                    const querys = new Map()
                    querys.set(parameterIndex, opts)
                    propertys.set(propertyKey, {
                        querys
                    })
                } else if (type === 'body') {
                    const bodys = new Map()
                    bodys.set(parameterIndex, opts)
                    propertys.set(propertyKey, {
                        bodys
                    })
                } else if (type === 'param') {
                    const params = new Map()
                    params.set(parameterIndex, opts)
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

export const RequestQuery = createRequestParameterDecorator('query')
export const RequestParam = createRequestParameterDecorator('param')
export const RequestBody = createRequestParameterDecorator('body')

/**
 * @method RequestMapping
 * @param path
 * @param method
 * @author ranyunlong<549510622@qq.com>
 */
export function RequestMapping(path: string, method: ElementType.METHOD = ElementType.METHOD.ALL): RequestMappingDecorator {
    function decorator(...args: any[]): any {
        const [ target, propertyKey, descriptor ] = args
        if (args.length === 1) {
            const options: ControllerOptions = target.prototype
            options.path = path
            options.method = method
        } else {
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
 * @method GetMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function GetMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.GET)
}

/**
 * @method PostMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function PostMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.POST)
}

/**
 * @method DeleteMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function DeleteMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.DELETE)
}

/**
 * @method CopyMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function CopyMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.COPY)
}

/**
 * @method HeadMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function HeadMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.HEAD)
}

/**
 * @method LinkMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function LinkMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.LINK)
}

/**
 * @method LinkMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function UnlinkMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.UNLINK)
}

/**
 * @method OptionsMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function OptionsMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.OPTIONS)
}

/**
 * @method PatchMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function PatchMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.PATCH)
}

/**
 * @method PropfindMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function PropfindMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.PROPFIND)
}

/**
 * @method PurgeMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function PurgeMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.PURGE)
}

/**
 * @method PutMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function PutMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.PUT)
}

/**
 * @method LockMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function LockMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.LOCK)
}

/**
 * @method UnlockMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function UnlockMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.UNLOCK)
}

/**
 * @method ViewMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export function ViewMapping(path: string): MethodDecorator {
    return RequestMapping(path, ElementType.METHOD.VIEW)
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
    Entity?: EasyBootEntityConstructor;
    keys?: string | string[];
    validators?: Validator | Validator[];
    rule?: {
        [key: string]: Validator | Validator[] | null;
    }
}