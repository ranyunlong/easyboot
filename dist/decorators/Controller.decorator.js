"use strict";
/**
 * @module Controller
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
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
    if (!Reflect.getMetadata(metadata_constant_1.BASE.CONTROLLER, target)) {
        Reflect.defineMetadata(metadata_constant_1.BASE.CONTROLLER, true, target);
    }
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.decorator.js.map