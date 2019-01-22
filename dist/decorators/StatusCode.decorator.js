"use strict";
/**
 * @module StatusCode
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
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
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.STATUS_CODE, statusCode, target.constructor, propertyKey);
    };
}
exports.StatusCode = StatusCode;
//# sourceMappingURL=StatusCode.decorator.js.map