/**
 * @module Exception
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { HttpException } from '../core/HttpException';
import { CONTROLLER } from '../constants/metadata.constant';
import { DevStackTrace } from '../core/DevStackTrace';

/**
 * Exception decorator
 *
 * The decorator apply to Contorllor propertys, Used to handle exception.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public async index(){}
 *
 *     @GetMapping
 *     @Exception(new HttpException({ statusCode: 404, data: {error: 'invald param'}}))
 *     public async test(){}
 *
 *     @GetMapping
 *     @Exception(new CustomException({ data: {error: 'invald param'}})
 *     public async test1(){}
 * }
 * ```
 */
export function Exception(Exception: HttpException): MethodDecorator {
    return (target: Object, propertyKey: string): void => {
        const trace = new DevStackTrace(`Invalid decorator: @Exception(), 'argument must be object.`, {
            value: 'Exception',
            scopes: [ 'meta.decorator.ts' ]
        })
        if (typeof Exception !== 'object') {
            trace.throw()
        }
        Reflect.defineMetadata(CONTROLLER.EXCEPTION, Exception, target.constructor, propertyKey)
    }
}