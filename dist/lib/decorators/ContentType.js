"use strict";
/**
 * @module ContentType
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
require("reflect-metadata");
/**
 * ContentType decorator
 *
 * The decorator apply to Contorllor propertys, use to set response content type.
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
 *     @ContentType('application/json')
 *     public async test(){}
 *
 *     @GetMapping
 *     @ContentType('text/html')
 *     public async test1(){}
 * }
 * ```
 */
function ContentType(type) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(enums_1.MetadataEnums.Controller.CONTENT_TYPE, type, target.constructor, propertyKey);
    };
}
exports.ContentType = ContentType;
