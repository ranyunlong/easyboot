/**
 * @module Exception
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { HttpException } from '../core/HttpException';
import { CONTROLLER } from '../constants/metadata.constant';
import { DevStackTace } from '../core/DevStackTace';

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
        const trace = new DevStackTace(`Invalid decorator: @Exception(), 'argument must be object.`, 'meta.decorator.ts', 'Exception')
        if (typeof Exception !== 'object') {
            trace.throw()
        }
        Reflect.defineMetadata(CONTROLLER.EXCEPTION, Exception, target.constructor, propertyKey)
    }
}