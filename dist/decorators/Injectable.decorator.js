"use strict";
/**
 * @module Injectable
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
/**
 * Injectable decorator
 *
 * The decorator apply to any class.
 *
 * Example
 * ```
 * @Injectable
 * export class IndexController {}
 * ```
 */
function Injectable(target) {
    Reflect.defineMetadata(metadata_constant_1.BASE.INJECTABLE, true, target);
}
exports.Injectable = Injectable;
//# sourceMappingURL=Injectable.decorator.js.map