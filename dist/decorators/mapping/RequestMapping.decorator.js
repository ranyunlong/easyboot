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
//# sourceMappingURL=RequestMapping.decorator.js.map