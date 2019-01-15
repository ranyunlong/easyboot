/**
 * @module UnlockMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

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
 *
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
        return RequestMapping(null, RequestEnum.Methods.UNLOCK)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.UNLOCK)
    }
}