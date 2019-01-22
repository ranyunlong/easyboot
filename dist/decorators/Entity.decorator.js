"use strict";
/**
 * @module Entity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
function Entity(target) {
    Reflect.defineMetadata(metadata_constant_1.BASE.ENTITY, true, target);
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.decorator.js.map