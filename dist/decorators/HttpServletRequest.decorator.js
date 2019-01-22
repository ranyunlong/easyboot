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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cFNlcnZsZXRSZXF1ZXN0LmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL0h0dHBTZXJ2bGV0UmVxdWVzdC5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILHNFQUFrRTtBQUNsRSx5REFBc0Q7QUFDdEQsMkRBQXVEO0FBRXZELFNBQWdCLGtCQUFrQixDQUFDLE1BQWMsRUFBRSxXQUFtQixFQUFFLGNBQXNCO0lBQzFGLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsd0JBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzVFLE1BQU0sS0FBSyxHQUFHLElBQUksNkJBQWEsQ0FBQyw0RUFBNEUsRUFBRTtRQUMxRyxLQUFLLEVBQUUsb0JBQW9CO1FBQzNCLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixDQUFDO0tBQ2hDLENBQUMsQ0FBQTtJQUNGLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxLQUFLLCtCQUFjLEVBQUU7UUFDL0MsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQ2hCO0lBQ0QsT0FBTyxDQUFDLGNBQWMsQ0FBQyw4QkFBVSxDQUFDLE9BQU8sRUFBRTtRQUN2QyxLQUFLLEVBQUUsY0FBYztRQUNyQixXQUFXO0tBQ2QsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0FBQ3ZDLENBQUM7QUFiRCxnREFhQyJ9