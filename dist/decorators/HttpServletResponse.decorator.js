"use strict";
/**
 * @module HttpServletResponse
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const DevStackTrace_1 = require("../core/DevStackTrace");
const ServletResponse_1 = require("../core/ServletResponse");
function HttpServletResponse(target, propertyKey, parameterIndex) {
    const paramtypes = Reflect.getMetadata(metadata_constant_1.BASE.PARAMTYPES, target, propertyKey);
    const trace = new DevStackTrace_1.DevStackTrace('Invalid decorator: @HttpServletRequest, param type must be ServletRequest.', {
        value: 'HttpServletRequest',
        scopes: [
            'meta.class.ts',
            'meta.parameters.ts',
            'meta.method.declaration.ts',
            'variable.other.readwrite.ts',
            'meta.decorator.ts'
        ]
    });
    if (paramtypes[parameterIndex] !== ServletResponse_1.ServletResponse) {
        trace.throw();
    }
    Reflect.defineMetadata(metadata_constant_1.CONTROLLER.RESPONSE, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey);
}
exports.HttpServletResponse = HttpServletResponse;
//# sourceMappingURL=HttpServletResponse.decorator.js.map