/**
 * @module PutMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

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
        return RequestMapping(null, RequestEnum.Methods.PUT)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.PUT)
    }
}