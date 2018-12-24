"use strict";
/**
 * @module RquestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
require("reflect-metadata");
function Upload(...args) {
    if (args.length === 1) {
        return (target, propertyKey, descriptor) => {
            Reflect.defineMetadata(enums_1.MetadataEnums.Controller.REQUEST_FILE, args[0], target.constructor, propertyKey);
        };
    }
    else {
        const [target, propertyKey, descriptor] = args;
        Reflect.defineMetadata(enums_1.MetadataEnums.Controller.REQUEST_FILE, {}, target.constructor, propertyKey);
    }
}
exports.Upload = Upload;
