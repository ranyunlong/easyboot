/**
 * @module PurgeMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

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
        return RequestMapping(null, RequestEnum.Methods.PURGE)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.PURGE)
    }
}