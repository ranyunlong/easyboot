/**
 * @module PropfindMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

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
        return RequestMapping(null, RequestEnum.Methods.PROPFIND)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.PROPFIND)
    }
}