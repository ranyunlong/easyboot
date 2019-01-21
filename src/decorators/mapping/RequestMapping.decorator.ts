/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { BASE, CONTROLLER } from '../../constants/metadata.constant';
import { RequestEnum } from '../../enums/request.mapping.enum';
import { DevStackTrace } from '../../core/DevStackTrace';
import * as pathToRegexp from 'path-to-regexp'

const defalutMethod = RequestEnum.Methods.ALL

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

interface RequestMappingDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
    <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
}

export function RequestMapping(path: string, method: RequestEnum.Methods = defalutMethod): RequestMappingDecorator {
    return function decorator(...args: any[]): void {
        const [ target, propertyKey, descriptor ] = args
        if (args.length === 1) { // ClassDecorator {
            const trace = new DevStackTrace(`Invalid decorator: RequestMapping(), argument: '${path}' is invalid.`, {
                value: 'RequestMapping',
                scopes: ['meta.decorator.ts']
            })
            if (/[^0-9A-z\:\-\/]+/.test(path)) {
                trace.throw()
            }
            Reflect.defineMetadata(BASE.CONTROLLER, {path, method}, target)
        } else if (args.length === 3) { // MethodDecorator
            const trace = new DevStackTrace(`Invalid decorator: ${RequestEnum.Names[method]}(), argument: '${path}' is invalid.`, {
                value: RequestEnum.Names[method],
                scopes: ['meta.decorator.ts']
            })
            if (/[^0-9A-z\:\-\/]+/.test(path)) {
                trace.throw()
            }
            const requestBody = Reflect.getMetadata(CONTROLLER.REQUEST_BODY, target.constructor, propertyKey)
            const requestParam = Reflect.getMetadata(CONTROLLER.REQUEST_PARAM, target.constructor, propertyKey)
            if (requestParam) {
                let keys: pathToRegexp.Key[] = []
                let p = path || propertyKey
                pathToRegexp(p, keys)
                if (keys.length === 0) {
                    trace.message = `Invalid decorator: ${RequestEnum.Names[method]}(), argument: '${path}' is not dynamic routing.`
                    trace.throw()
                }
            }

            if (requestBody && /GET|DELETE|HEAD|COPY|PURGE|UNLOCK/.test(method)) {
                trace.message = `Invalid decorator: Used ${RequestEnum.Names[method]}() decorator, this route method is '${method}', cannot use @RequestBody decorator, you can try @PostMapping decorator.`
                trace.throw()
            }
            const metadatas = Reflect.getMetadata(CONTROLLER.REQUEST_MAPPING, target.constructor) || []
            Reflect.defineMetadata(CONTROLLER.REQUEST_MAPPING, [...metadatas, {
                path,
                method,
                propertyKey
            }], target.constructor)
        }
    }
}

export { CopyMapping } from './CopyMapping.decorator'
export { DeleteMapping } from './DeleteMapping.decorator'
export { GetMapping } from './GetMapping.decorator'
export { HeadMapping } from './HeadMapping.decorator'
export { LinkMapping } from './LinkMapping.decorator'
export { LockMapping } from './LockMapping.decorator'
export { OptionsMapping } from './OptionsMapping.decorator'
export { PatchMapping } from './PatchMapping.decorator'
export { PostMapping } from './PostMapping.decorator'
export { PropfindMapping } from './PropfindMapping.decorator'
export { PurgeMapping } from './PurgeMapping.decorator'
export { PutMapping } from './PutMapping.decorator'
export { UnlinkMapping } from './UnlinkMapping.decorator'
export { UnlockMapping } from './UnlockMapping.decorator'
export { ViewMapping } from './ViewMapping.decorator'