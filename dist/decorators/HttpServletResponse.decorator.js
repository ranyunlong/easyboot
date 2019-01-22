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
        scopes: ['meta.decorator.ts']
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cFNlcnZsZXRSZXNwb25zZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVjb3JhdG9ycy9IdHRwU2VydmxldFJlc3BvbnNlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsc0VBQWtFO0FBQ2xFLHlEQUFzRDtBQUN0RCw2REFBMEQ7QUFFMUQsU0FBZ0IsbUJBQW1CLENBQUMsTUFBYyxFQUFFLFdBQW1CLEVBQUUsY0FBc0I7SUFDM0YsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyx3QkFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDNUUsTUFBTSxLQUFLLEdBQUcsSUFBSSw2QkFBYSxDQUFDLDRFQUE0RSxFQUFFO1FBQzFHLEtBQUssRUFBRSxvQkFBb0I7UUFDM0IsTUFBTSxFQUFFLENBQUMsbUJBQW1CLENBQUM7S0FDaEMsQ0FBQyxDQUFBO0lBQ0YsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssaUNBQWUsRUFBRTtRQUNoRCxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDaEI7SUFDRCxPQUFPLENBQUMsY0FBYyxDQUFDLDhCQUFVLENBQUMsUUFBUSxFQUFFO1FBQ3hDLEtBQUssRUFBRSxjQUFjO1FBQ3JCLFdBQVc7S0FDZCxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDdkMsQ0FBQztBQWJELGtEQWFDIn0=