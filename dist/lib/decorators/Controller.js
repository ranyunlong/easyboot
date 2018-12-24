"use strict";
/**
 * @module Controller
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const StackTrace_1 = require("../StackTrace/StackTrace");
require("reflect-metadata");
/**
 * Controller decorator
 *
 * The decorator apply to Contorllor.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@HttpServletRequest request: Request) {
 *        return request.method
 *     }
 * }
 * ```
 */
function Controller(target) {
    StackTrace_1.StackTrace.defineController(target);
    Reflect.defineMetadata(enums_1.MetadataEnums.Controller.IS_CONTROLLER, true, target);
}
exports.Controller = Controller;
