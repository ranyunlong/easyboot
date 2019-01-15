/**
 * @module GetMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RequestMapping } from './RequestMapping.decorator';
import { RequestEnum } from '../../enums/request.mapping.enum';

/**
 * GetMapping decorator
 *
 * The decorator apply  Contorllor propertys, Used to route.
 * Request method GET
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping('admin')
 *     public async index(){}
 *
 *     @GetMapping
 *     public async test(){}
 * }
 * ```
 */
export function GetMapping<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function GetMapping(path: string): MethodDecorator
export function GetMapping(...args: any[]): any {
    if (args.length > 1) {
        const [target, propertyKey, descriptor ] = args;
        return RequestMapping(null, RequestEnum.Methods.GET)(target, propertyKey, descriptor)
    } else {
        return RequestMapping(args[0], RequestEnum.Methods.GET)
    }
}
