"use strict";
/**
 * @module Service
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const Session_1 = require("../core/Session");
const DevStackTrace_1 = require("../core/DevStackTrace");
function HttpServletSession(target, propertyKey, parameterIndex) {
    const paramtypes = Reflect.getMetadata(metadata_constant_1.BASE.PARAMTYPES, target, propertyKey);
    const trace = new DevStackTrace_1.DevStackTrace('Invalid decorator @HttpServletSession, param type must be use Session.', {
        value: 'HttpServletSession',
        scopes: [
            'meta.class.ts',
            'meta.parameters.ts',
            'meta.method.declaration.ts',
            'variable.other.readwrite.ts',
            'meta.decorator.ts'
        ]
    });
    if (Array.isArray(paramtypes)) {
        if (paramtypes[parameterIndex] !== Session_1.Session) {
            trace.throw();
        }
    }
    Reflect.defineMetadata(metadata_constant_1.CONTROLLER.SESSION, {
        index: parameterIndex,
        key: propertyKey
    }, target.constructor, propertyKey);
}
exports.HttpServletSession = HttpServletSession;
//# sourceMappingURL=HttpServletSession.decorator.js.map