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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cFNlcnZsZXRTZXNzaW9uLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL0h0dHBTZXJ2bGV0U2Vzc2lvbi5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILHNFQUEyRDtBQUUzRCxTQUFnQixrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsV0FBbUIsRUFBRSxjQUFzQjtJQUMxRixPQUFPLENBQUMsY0FBYyxDQUFDLDhCQUFVLENBQUMsT0FBTyxFQUFFO1FBQ3ZDLEtBQUssRUFBRSxjQUFjO1FBQ3JCLEdBQUcsRUFBRSxXQUFXO0tBQ25CLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUN2QyxDQUFDO0FBTEQsZ0RBS0MifQ==