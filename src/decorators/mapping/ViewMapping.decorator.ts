/**
 * @module ViewMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

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
        return RequestMapping(null, RequestEnum.Methods.VIEW)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.VIEW)
    }
}