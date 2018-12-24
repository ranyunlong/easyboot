/**
 * @module Exception
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { HttpException, HttpExceptionConstructor } from '../core';
import 'reflect-metadata';
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
export declare function ExceptionCapture(Exception: HttpExceptionConstructor): MethodDecorator;
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
export declare function Exception(Exception: HttpException): MethodDecorator;
