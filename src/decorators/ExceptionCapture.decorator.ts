/**
 * @module ExceptionCapture
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { HttpExceptionConstructor } from '../core/HttpException';
import { CONTROLLER } from '../constants/metadata.constant';

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
        Reflect.defineMetadata(CONTROLLER.EXCEPTION_CAPTURE, Exception, target.constructor, propertyKey)
    }
}