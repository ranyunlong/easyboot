/**
 * @module PostMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

/**
 * PostMapping decorator
 *
 * The decorator apply  Contorllor propertys, Used to route.
 * Request method POST
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping('admin')
 *     public async index(){}
 *
 *     @PostMapping
 *     public async test(){}
 * }
 * ```
 */
export function PostMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function PostMapping(path: string): MethodDecorator
export function PostMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnum.Methods.POST)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.POST)
    }
}