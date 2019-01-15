/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { BASE, CONTROLLER } from '../../constants/metadata.constant';
import { RequestEnum } from '../../enums/request.mapping.enum';

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
            Reflect.defineMetadata(BASE.CONTROLLER, {path, method}, target)
        } else if (args.length === 3) { // MethodDecorator
            const metadatas = Reflect.getMetadata(CONTROLLER.REQUEST_MAPPING, target.constructor) || []
            Reflect.defineMetadata(CONTROLLER.REQUEST_MAPPING, [...metadatas, {
                path,
                method,
                propertyKey
            }], target.constructor)
        }
    }
}