/**
 * @module OptionsMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

/**
 * OptionsMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method OPTIONS
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @OptionsMapping('admin')
 *     public async index(){}
 *
 *     @OptionsMapping
 *     public async test(){}
 * }
 * ```
 */
export function OptionsMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function OptionsMapping(path: string): MethodDecorator
export function OptionsMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnum.Methods.OPTIONS)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.OPTIONS)
    }
}