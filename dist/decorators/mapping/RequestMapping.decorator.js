"use strict";
/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../../constants/metadata.constant");
const request_mapping_enum_1 = require("../../enums/request.mapping.enum");
const DevStackTrace_1 = require("../../core/DevStackTrace");
const pathToRegexp = require("path-to-regexp");
const defalutMethod = request_mapping_enum_1.RequestEnum.Methods.ALL;
function RequestMapping(path, method = defalutMethod) {
    return function decorator(...args) {
        const [target, propertyKey, descriptor] = args;
        if (args.length === 1) { // ClassDecorator {
            const trace = new DevStackTrace_1.DevStackTrace(`Invalid decorator: RequestMapping(), argument: '${path}' is invalid.`, {
                value: 'RequestMapping',
                scopes: ['meta.decorator.ts']
            });
            if (/[^0-9A-z\:\-\/]+/.test(path)) {
                trace.throw();
            }
            Reflect.defineMetadata(metadata_constant_1.BASE.CONTROLLER, { path, method }, target);
        }
        else if (args.length === 3) { // MethodDecorator
            const trace = new DevStackTrace_1.DevStackTrace(`Invalid decorator: ${request_mapping_enum_1.RequestEnum.Names[method]}(), argument: '${path}' is invalid.`, {
                value: request_mapping_enum_1.RequestEnum.Names[method],
                scopes: ['meta.decorator.ts']
            });
            if (/[^0-9A-z\:\-\/]+/.test(path)) {
                trace.throw();
            }
            const requestBody = Reflect.getMetadata(metadata_constant_1.CONTROLLER.REQUEST_BODY, target.constructor, propertyKey);
            const requestParam = Reflect.getMetadata(metadata_constant_1.CONTROLLER.REQUEST_PARAM, target.constructor, propertyKey);
            if (requestParam) {
                let keys = [];
                let p = path || propertyKey;
                pathToRegexp(p, keys);
                if (keys.length === 0) {
                    trace.message = `Invalid decorator: ${request_mapping_enum_1.RequestEnum.Names[method]}(), argument: '${path}' is not dynamic routing.`;
                    trace.throw();
                }
            }
            if (requestBody && /GET|DELETE|HEAD|COPY|PURGE|UNLOCK/.test(method)) {
                trace.message = `Invalid decorator: Used ${request_mapping_enum_1.RequestEnum.Names[method]}() decorator, this route method is '${method}', cannot use @RequestBody decorator, you can try @PostMapping decorator.`;
                trace.throw();
            }
            const metadatas = Reflect.getMetadata(metadata_constant_1.CONTROLLER.REQUEST_MAPPING, target.constructor) || [];
            Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_MAPPING, [...metadatas, {
                    path,
                    method,
                    propertyKey
                }], target.constructor);
        }
    };
}
exports.RequestMapping = RequestMapping;
var CopyMapping_decorator_1 = require("./CopyMapping.decorator");
exports.CopyMapping = CopyMapping_decorator_1.CopyMapping;
var DeleteMapping_decorator_1 = require("./DeleteMapping.decorator");
exports.DeleteMapping = DeleteMapping_decorator_1.DeleteMapping;
var GetMapping_decorator_1 = require("./GetMapping.decorator");
exports.GetMapping = GetMapping_decorator_1.GetMapping;
var HeadMapping_decorator_1 = require("./HeadMapping.decorator");
exports.HeadMapping = HeadMapping_decorator_1.HeadMapping;
var LinkMapping_decorator_1 = require("./LinkMapping.decorator");
exports.LinkMapping = LinkMapping_decorator_1.LinkMapping;
var LockMapping_decorator_1 = require("./LockMapping.decorator");
exports.LockMapping = LockMapping_decorator_1.LockMapping;
var OptionsMapping_decorator_1 = require("./OptionsMapping.decorator");
exports.OptionsMapping = OptionsMapping_decorator_1.OptionsMapping;
var PatchMapping_decorator_1 = require("./PatchMapping.decorator");
exports.PatchMapping = PatchMapping_decorator_1.PatchMapping;
var PostMapping_decorator_1 = require("./PostMapping.decorator");
exports.PostMapping = PostMapping_decorator_1.PostMapping;
var PropfindMapping_decorator_1 = require("./PropfindMapping.decorator");
exports.PropfindMapping = PropfindMapping_decorator_1.PropfindMapping;
var PurgeMapping_decorator_1 = require("./PurgeMapping.decorator");
exports.PurgeMapping = PurgeMapping_decorator_1.PurgeMapping;
var PutMapping_decorator_1 = require("./PutMapping.decorator");
exports.PutMapping = PutMapping_decorator_1.PutMapping;
var UnlinkMapping_decorator_1 = require("./UnlinkMapping.decorator");
exports.UnlinkMapping = UnlinkMapping_decorator_1.UnlinkMapping;
var UnlockMapping_decorator_1 = require("./UnlockMapping.decorator");
exports.UnlockMapping = UnlockMapping_decorator_1.UnlockMapping;
var ViewMapping_decorator_1 = require("./ViewMapping.decorator");
exports.ViewMapping = ViewMapping_decorator_1.ViewMapping;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdE1hcHBpbmcuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlY29yYXRvcnMvbWFwcGluZy9SZXF1ZXN0TWFwcGluZy5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILHlFQUFxRTtBQUNyRSwyRUFBK0Q7QUFDL0QsNERBQXlEO0FBQ3pELCtDQUE4QztBQUU5QyxNQUFNLGFBQWEsR0FBRyxrQ0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUE7QUFxQzdDLFNBQWdCLGNBQWMsQ0FBQyxJQUFZLEVBQUUsU0FBOEIsYUFBYTtJQUNwRixPQUFPLFNBQVMsU0FBUyxDQUFDLEdBQUcsSUFBVztRQUNwQyxNQUFNLENBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUUsR0FBRyxJQUFJLENBQUE7UUFDaEQsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxFQUFFLG1CQUFtQjtZQUN4QyxNQUFNLEtBQUssR0FBRyxJQUFJLDZCQUFhLENBQUMsbURBQW1ELElBQUksZUFBZSxFQUFFO2dCQUNwRyxLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2QixNQUFNLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUNoQyxDQUFDLENBQUE7WUFDRixJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0IsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBO2FBQ2hCO1lBQ0QsT0FBTyxDQUFDLGNBQWMsQ0FBQyx3QkFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUNsRTthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsRUFBRSxrQkFBa0I7WUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSw2QkFBYSxDQUFDLHNCQUFzQixrQ0FBVyxDQUFDLEtB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