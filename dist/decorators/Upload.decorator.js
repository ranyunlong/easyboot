"use strict";
/**
 * @module RquestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
function Upload(...args) {
    if (args.length === 1) {
        return (target, propertyKey, descriptor) => {
            Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_FILE, args[0], target.constructor, propertyKey);
        };
    }
    else {
        const [target, propertyKey, descriptor] = args;
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_FILE, {}, target.constructor, propertyKey);
    }
}
exports.Upload = Upload;
//# sourceMappingURL=Upload.decorator.js.map