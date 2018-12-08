/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestElementTypes, MetadataElementTypes } from '../enums'
import 'reflect-metadata'

const defalutMethod = RequestElementTypes.METHOD.ALL

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
export function RequestMapping(path: string, method: RequestElementTypes.METHOD = defalutMethod): RequestMappingDecorator {
    return function decorator(...args: any[]): any {
        const [ target, propertyKey, descriptor ] = args
        if (args.length === 1) { // ClassDecorator
            Reflect.defineMetadata(MetadataElementTypes.Metadata.CONTROLLER, {path, method}, target)
        } else if (args.length === 3) { // MethodDecorator
            const metadatas = Reflect.getMetadata(MetadataElementTypes.Metadata.REQUEST_MAPPING, target.constructor) || []
            Reflect.defineMetadata(MetadataElementTypes.Metadata.REQUEST_MAPPING, [...metadatas, {
                path,
                method,
                propertyKey
            }], target.constructor)
            return descriptor
        }
    }
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
    return RequestMapping(path, RequestElementTypes.METHOD.GET)
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
    return RequestMapping(path, RequestElementTypes.METHOD.POST)
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
    return RequestMapping(path, RequestElementTypes.METHOD.DELETE)
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
    return RequestMapping(path, RequestElementTypes.METHOD.COPY)
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
    return RequestMapping(path, RequestElementTypes.METHOD.HEAD)
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
    return RequestMapping(path, RequestElementTypes.METHOD.LINK)
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
    return RequestMapping(path, RequestElementTypes.METHOD.UNLINK)
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
    return RequestMapping(path, RequestElementTypes.METHOD.OPTIONS)
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
    return RequestMapping(path, RequestElementTypes.METHOD.PATCH)
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
    return RequestMapping(path, RequestElementTypes.METHOD.PROPFIND)
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
    return RequestMapping(path, RequestElementTypes.METHOD.PURGE)
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
    return RequestMapping(path, RequestElementTypes.METHOD.PUT)
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
    return RequestMapping(path, RequestElementTypes.METHOD.LOCK)
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
    return RequestMapping(path, RequestElementTypes.METHOD.UNLOCK)
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
    return RequestMapping(path, RequestElementTypes.METHOD.VIEW)
}

interface RequestMappingDecorator {
    <T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
    <TFunction extends Function>(target: TFunction): TFunction | void;
}