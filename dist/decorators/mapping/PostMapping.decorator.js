"use strict";
/**
 * @module PostMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const RequestMapping_decorator_1 = require("./RequestMapping.decorator");
const request_mapping_enum_1 = require("../../enums/request.mapping.enum");
function PostMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping_decorator_1.RequestMapping(null, request_mapping_enum_1.RequestEnum.Methods.POST)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping_decorator_1.RequestMapping(args[0], request_mapping_enum_1.RequestEnum.Methods.POST);
    }
}
exports.PostMapping = PostMapping;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdE1hcHBpbmcuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlY29yYXRvcnMvbWFwcGluZy9Qb3N0TWFwcGluZy5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILHlFQUE0RDtBQUM1RCwyRUFBK0Q7QUF1Qi9ELFNBQWdCLFdBQVcsQ0FBQyxHQUFHLElBQVc7SUFDdEMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNqQixNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUUsR0FBRyxJQUFJLENBQUM7UUFDaEQsT0FBTyx5Q0FBYyxDQUFDLElBQUksRUFBRSxrQ0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0tBQ3pGO1NBQU07UUFDSCxPQUFPLHlDQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLGtDQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQzNEO0FBQ0wsQ0FBQztBQVBELGtDQU9DIn0=