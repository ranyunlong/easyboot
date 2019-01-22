"use strict";
/**
 * @module HttpServletRequest
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const DevStackTrace_1 = require("../core/DevStackTrace");
const ServletRequest_1 = require("../core/ServletRequest");
function HttpServletRequest(target, propertyKey, parameterIndex) {
    const paramtypes = Reflect.getMetadata(metadata_constant_1.BASE.PARAMTYPES, target, propertyKey);
    const trace = new DevStackTrace_1.DevStackTrace('Invalid decorator: @HttpServletRequest, param type must be ServletRequest.', {
        value: 'HttpServletRequest',
        scopes: ['meta.decorator.ts']
    });
    if (paramtypes[parameterIndex] !== ServletRequest_1.ServletRequest) {
        trace.throw();
    }
    Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey);
}
exports.HttpServletRequest = HttpServletRequest;
//# sourceMappingURL=HttpServletRequest.decorator.js.map