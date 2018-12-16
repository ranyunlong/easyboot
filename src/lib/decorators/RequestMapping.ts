/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestEnums, MetadataEnums } from '../enums'
import 'reflect-metadata'
const defalutMethod = RequestEnums.METHOD.ALL

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
export function RequestMapping(path: string, method: RequestEnums.METHOD = defalutMethod): RequestMappingDecorator {
    return function decorator(...args: any[]): any {
        const [ target, propertyKey, descriptor ] = args
        if (args.length === 1) { // ClassDecorator
            Reflect.defineMetadata(MetadataEnums.Metadata.CONTROLLER, {path, method}, target)
        } else if (args.length === 3) { // MethodDecorator
            const metadatas = Reflect.getMetadata(MetadataEnums.Metadata.REQUEST_MAPPING, target.constructor) || []
            Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST_MAPPING, [...metadatas, {
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
 *
 *     @GetMapping
 *     public async test(){}
 * }
 * ```
 */
export function GetMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function GetMapping(path: string): MethodDecorator
export function GetMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.GET)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.GET)
    }
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
 *
 *     @PostMapping
 *     public async test(){}
 * }
 * ```
 */
export function PostMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function PostMapping(path: string): MethodDecorator
export function PostMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.POST)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.POST)
    }
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
 *
 *      @DeleteMapping
 *     public async test(){}
 * }
 * ```
 */
export function DeleteMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function DeleteMapping(path: string): MethodDecorator
export function DeleteMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.DELETE)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.DELETE)
    }
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
 *
 *     @CopyMapping
 *     public async test(){}
 * }
 * ```
 */
export function CopyMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function CopyMapping(path: string): MethodDecorator
export function CopyMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.COPY)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.COPY)
    }
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
 *
 *     @HeadMapping
 *     public async test(){}
 * }
 * ```
 */
export function HeadMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function HeadMapping(path: string): MethodDecorator
export function HeadMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.HEAD)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.HEAD)
    }
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
 *
 *     @LinkMapping
 *     public async test(){}
 * }
 * ```
 */
export function LinkMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function LinkMapping(path: string): MethodDecorator
export function LinkMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.LINK)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.LINK)
    }
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
 *
 *     @UnlinkMapping
 *     public async test(){}
 * }
 * ```
 */
export function UnlinkMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function UnlinkMapping(path: string): MethodDecorator
export function UnlinkMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.UNLINK)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.UNLINK)
    }
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
 *
 *     @OptionsMapping
 *     public async test(){}
 * }
 * ```
 */
export function OptionsMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function OptionsMapping(path: string): MethodDecorator
export function OptionsMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.OPTIONS)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.OPTIONS)
    }
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
 *
 *     @PatchMapping
 *     public async test(){}
 * }
 * ```
 */
export function PatchMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function PatchMapping(path: string): MethodDecorator
export function PatchMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.PATCH)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.PATCH)
    }
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
 *
 *     @PropfindMapping
 *     public async test(){}
 * }
 * ```
 */
export function PropfindMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function PropfindMapping(path: string): MethodDecorator
export function PropfindMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.PROPFIND)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.PROPFIND)
    }
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
 *
 *     @PurgeMapping
 *     public async test(){}
 * }
 * ```
 */
export function PurgeMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function PurgeMapping(path: string): MethodDecorator
export function PurgeMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.PURGE)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.PURGE)
    }
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
 *
 *     @PutMapping
 *     public async test(){}
 * }
 * ```
 */
export function PutMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function PutMapping(path: string): MethodDecorator
export function PutMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.PUT)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.PUT)
    }
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
 *
 *     @LockMapping
 *     public async test(){}
 * }
 * ```
 */
export function LockMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function LockMapping(path: string): MethodDecorator
export function LockMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.LOCK)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.LOCK)
    }
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
 *     @UnlockMapping
 *     public async test(){}
 * }
 * ```
 */
export function UnlockMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function UnlockMapping(path: string): MethodDecorator
export function UnlockMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.UNLOCK)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.UNLOCK)
    }
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
 *
 *     @ViewMapping
 *     public async test(){}
 * }
 * ```
 */
export function ViewMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function ViewMapping(path: string): MethodDecorator
export function ViewMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnums.METHOD.VIEW)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnums.METHOD.VIEW)
    }
}

interface RequestMappingDecorator {
    <T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
    <TFunction extends Function>(target: TFunction): TFunction | void;
}