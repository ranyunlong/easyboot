/**
 * @module LockMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

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
        return RequestMapping(null, RequestEnum.Methods.LOCK)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.LOCK)
    }
}