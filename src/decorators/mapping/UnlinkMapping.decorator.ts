/**
 * @module UnlinkMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

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
        return RequestMapping(null, RequestEnum.Methods.UNLINK)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.UNLINK)
    }
}