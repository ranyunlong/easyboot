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
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.STATUS_MESSAGE, statusCode, target.constructor, propertyKey);
    };
}
exports.StatusMessage = StatusMessage;
//# sourceMappingURL=StatusMessage.decorator.js.map