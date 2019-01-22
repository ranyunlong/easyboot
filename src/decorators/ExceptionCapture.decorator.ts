/**
 * @module ExceptionCapture
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { HttpExceptionConstructor } from '../core/HttpException';
import { CONTROLLER } from '../constants/metadata.constant';
import { DevStackTrace } from '../core/DevStackTrace';

/**
 * ExceptionCapture decorator
 *
 * The decorator apply to Contorllor propertys, Used to capture exception.
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
 *     @ExceptionCapture(HttpException)
 *     public test(){}
 *
 *     @GetMapping
 *     @ExceptionCapture(CustomException)
 *     public async test1(){}
 * }
 * ```
 */
export function ExceptionCapture(Exception: HttpExceptionConstructor): MethodDecorator {
    return (target: Object, propertyKey: string): void => {
        const trace = new DevStackTrace(`Invalid decorator: @ExceptionCapture(), 'argument must be Function.`, {
            value: 'ExceptionCapture',
            scopes: [
                'entity.name.function.ts',
                'meta.function-call.ts',
                'meta.decorator.ts',
                'meta.class.ts'
            ]
        })
        if (typeof Exception !== 'function') {
            trace.throw()
        }
        Reflect.defineMetadata(CONTROLLER.EXCEPTION_CAPTURE, Exception, target.constructor, propertyKey)
    }
}