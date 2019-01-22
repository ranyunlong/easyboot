"use strict";
/**
 * @module ContentType
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const mime_types_1 = require("mime-types");
const DevStackTrace_1 = require("../core/DevStackTrace");
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
        const trace = new DevStackTrace_1.DevStackTrace(`Invalid decorator: @ContentType('${type}'), '${type}' is not mime-type.`, {
            value: 'ContentType',
            scopes: ['meta.decorator.ts']
        });
        if (!mime_types_1.contentType(type)) {
            trace.throw();
        }
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.CONTENT_TYPE, mime_types_1.contentType(type), target.constructor, propertyKey);
    };
}
exports.ContentType = ContentType;
//# sourceMappingURL=ContentType.decorator.js.map