"use strict";
/**
 * @module ExceptionCapture
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const DevStackTrace_1 = require("../core/DevStackTrace");
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
        const trace = new DevStackTrace_1.DevStackTrace(`Invalid decorator: @ExceptionCapture(), 'argument must be Function.`, {
            value: 'ExceptionCapture',
            scopes: ['meta.decorator.ts']
        });
        if (typeof Exception !== 'function') {
            trace.throw();
        }
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.EXCEPTION_CAPTURE, Exception, target.constructor, propertyKey);
    };
}
exports.ExceptionCapture = ExceptionCapture;
//# sourceMappingURL=ExceptionCapture.decorator.js.map