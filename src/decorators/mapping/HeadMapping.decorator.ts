/**
 * @module HeadMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

/**
 * HeadMapping decorator
 *
 * The decorator apply to Contorllor propertys, Used to route.
 * Request method HEAD
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @HeadMapping('admin')
 *     public async index(){}
 *
 *     @HeadMapping
 *     public async test(){}
 * }
 * ```
 */

export function HeadMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function HeadMapping(path: string): MethodDecorator
export function HeadMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnum.Methods.HEAD)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.HEAD)
    }
}