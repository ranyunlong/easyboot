/**
 * @module PatchMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

/**
 * PatchMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method PATCH
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PatchMapping('admin')
 *     public async index(){}
 *
 *     @PatchMapping
 *     public async test(){}
 * }
 * ```
 */
export function PatchMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function PatchMapping(path: string): MethodDecorator
export function PatchMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnum.Methods.PATCH)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.PATCH)
    }
}