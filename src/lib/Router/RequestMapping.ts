/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { ElementType } from './ElementType'
import * as assert from 'assert'
import { DecoratorException } from '../DecoratorException';
import { EasyBootEntityConstructor } from '../EasyBootEntity';

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
            const options = target.prototype
            options.$route = path
            options.$method = method
        } else {
            const propertys: Propertys = target.$propertys || new Map()
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
            target.$propertys = propertys
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

type PropertyKey = string;
type Method = ElementType.METHOD;

export type Routes = Map<Method, {
    path: string;
    propertyKey: PropertyKey;
    method: Method;
}>;

export type Propertys = Map<PropertyKey, {
    routes?: Routes;
    params?: Map<number, EasyBootEntityConstructor>;
    bodys?: Map<number, EasyBootEntityConstructor>;
    pathParams?: Map<number, {
        Entity: EasyBootEntityConstructor;
        keys: string[];
    }>;
}>
