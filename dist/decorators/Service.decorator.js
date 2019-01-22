"use strict";
/**
 * @module Service
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
function Service(arg) {
    if (typeof arg === 'boolean') {
        return (target) => {
            Reflect.defineMetadata(metadata_constant_1.BASE.GLOBAL_SERVICE, true, target);
            Reflect.defineMetadata(metadata_constant_1.BASE.SERVICE, true, target);
        };
    }
    else if (typeof arg === 'function') {
        Reflect.defineMetadata(metadata_constant_1.BASE.SERVICE, true, arg);
    }
}
exports.Service = Service;
//# sourceMappingURL=Service.decorator.js.map