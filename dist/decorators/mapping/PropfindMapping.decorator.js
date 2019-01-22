"use strict";
/**
 * @module PropfindMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const RequestMapping_decorator_1 = require("./RequestMapping.decorator");
const request_mapping_enum_1 = require("../../enums/request.mapping.enum");
function PropfindMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping_decorator_1.RequestMapping(null, request_mapping_enum_1.RequestEnum.Methods.PROPFIND)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping_decorator_1.RequestMapping(args[0], request_mapping_enum_1.RequestEnum.Methods.PROPFIND);
    }
}
exports.PropfindMapping = PropfindMapping;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvcGZpbmRNYXBwaW5nLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNvcmF0b3JzL21hcHBpbmcvUHJvcGZpbmRNYXBwaW5nLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgseUVBQTREO0FBQzVELDJFQUErRDtBQXVCL0QsU0FBZ0IsZUFBZSxDQUFDLEdBQUcsSUFBVztJQUMxQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2pCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBRSxHQUFHLElBQUksQ0FBQztRQUNoRCxPQUFPLHlDQUFjLENBQUMsSUFBSSxFQUFFLGtDQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUE7S0FDN0Y7U0FBTTtRQUNILE9BQU8seUNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsa0NBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDL0Q7QUFDTCxDQUFDO0FBUEQsMENBT0MifQ==