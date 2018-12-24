"use strict";
/**
 * @module Exception
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
require("reflect-metadata");
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
function ExceptionCapture(Exception) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(enums_1.MetadataEnums.Controller.EXCEPTION_CAPTURE, Exception, target.constructor, propertyKey);
    };
}
exports.ExceptionCapture = ExceptionCapture;
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
function Exception(Exception) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(enums_1.MetadataEnums.Controller.EXCEPTION, Exception, target.constructor, propertyKey);
    };
}
exports.Exception = Exception;
