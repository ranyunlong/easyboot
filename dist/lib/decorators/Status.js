"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module Status
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
const enums_1 = require("../enums");
require("reflect-metadata");
/**
 * StatusCode decorator
 *
 * The decorator apply to Contorllor propertys, use to set response status code.
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
 *     @StatusCode(400)
 *     public async test(){}
 *
 *     @GetMapping
 *     @StatusCode(300)
 *     public async test1(){}
 * }
 * ```
 */
function StatusCode(statusCode) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(enums_1.MetadataEnums.Controller.STATUS_CODE, statusCode, target.constructor, propertyKey);
    };
}
exports.StatusCode = StatusCode;
/**
 * StatusMessage decorator
 *
 * The decorator apply to Contorllor propertys, use to set response status message.
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
 *     @StatusMessage('Success')
 *     public async test(){}
 *
 *     @GetMapping
 *     @StatusMessage('Fail')
 *     public async test1(){}
 * }
 * ```
 */
function StatusMessage(statusCode) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(enums_1.MetadataEnums.Controller.STATUS_MESSAGE, statusCode, target.constructor, propertyKey);
    };
}
exports.StatusMessage = StatusMessage;
