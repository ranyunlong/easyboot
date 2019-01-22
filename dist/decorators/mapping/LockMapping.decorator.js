"use strict";
/**
 * @module LockMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const RequestMapping_decorator_1 = require("./RequestMapping.decorator");
const request_mapping_enum_1 = require("../../enums/request.mapping.enum");
function LockMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping_decorator_1.RequestMapping(null, request_mapping_enum_1.RequestEnum.Methods.LOCK)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping_decorator_1.RequestMapping(args[0], request_mapping_enum_1.RequestEnum.Methods.LOCK);
    }
}
exports.LockMapping = LockMapping;
//# sourceMappingURL=LockMapping.decorator.js.map