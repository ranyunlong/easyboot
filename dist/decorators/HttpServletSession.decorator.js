"use strict";
/**
 * @module Service
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
function HttpServletSession(target, propertyKey, parameterIndex) {
    Reflect.defineMetadata(metadata_constant_1.CONTROLLER.SESSION, {
        index: parameterIndex,
        key: propertyKey
    }, target.constructor, propertyKey);
}
exports.HttpServletSession = HttpServletSession;
//# sourceMappingURL=HttpServletSession.decorator.js.map