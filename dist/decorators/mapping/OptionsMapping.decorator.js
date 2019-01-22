"use strict";
/**
 * @module OptionsMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const RequestMapping_decorator_1 = require("./RequestMapping.decorator");
const request_mapping_enum_1 = require("../../enums/request.mapping.enum");
function OptionsMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping_decorator_1.RequestMapping(null, request_mapping_enum_1.RequestEnum.Methods.OPTIONS)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping_decorator_1.RequestMapping(args[0], request_mapping_enum_1.RequestEnum.Methods.OPTIONS);
    }
}
exports.OptionsMapping = OptionsMapping;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0aW9uc01hcHBpbmcuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlY29yYXRvcnMvbWFwcGluZy9PcHRpb25zTWFwcGluZy5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILHlFQUE0RDtBQUM1RCwyRUFBK0Q7QUF1Qi9ELFNBQWdCLGNBQWMsQ0FBQyxHQUFHLElBQVc7SUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNqQixNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUUsR0FBRyxJQUFJLENBQUM7UUFDaEQsT0FBTyx5Q0FBYyxDQUFDLElBQUksRUFBRSxrQ0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0tBQzVGO1NBQU07UUFDSCxPQUFPLHlDQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGtDQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQzlEO0FBQ0wsQ0FBQztBQVBELHdDQU9DIn0=