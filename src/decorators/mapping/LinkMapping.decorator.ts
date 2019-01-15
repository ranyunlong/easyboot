/**
 * @module LinkMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

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
        return RequestMapping(null, RequestEnum.Methods.LINK)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.LINK)
    }
}