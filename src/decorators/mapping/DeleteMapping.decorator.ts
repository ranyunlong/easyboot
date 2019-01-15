/**
 * @module DeleteMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

/**
 * DeleteMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method DELETE
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @DeleteMapping('admin')
 *     public async index(){}
 *
 *      @DeleteMapping
 *     public async test(){}
 * }
 * ```
 */
export function DeleteMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function DeleteMapping(path: string): MethodDecorator
export function DeleteMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnum.Methods.DELETE)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.DELETE)
    }
}