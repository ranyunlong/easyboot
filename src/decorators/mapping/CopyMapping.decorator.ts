/**
 * @module CopyMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

/**
 * CopyMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method COPY
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @CopyMapping('admin')
 *     public async index(){}
 *
 *     @CopyMapping
 *     public async test(){}
 * }
 * ```
 */
export function CopyMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function CopyMapping(path: string): MethodDecorator
export function CopyMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnum.Methods.COPY)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.COPY)
    }
}
