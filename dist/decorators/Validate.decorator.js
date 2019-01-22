"use strict";
/**
 * @module Validate
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
/**
 * Validate decorator
 *
 * The decorator apply to Entity.
 *
 * Example
 * ```
 * @Entity
 * export class UserEntity {
 * }
 * ```
 */
function Validate(validation) {
    return (target, propertyKey) => {
        const rules = Reflect.getMetadata(metadata_constant_1.BASE.VALIDATE, target.constructor) || {};
        rules[propertyKey] = validation;
        Reflect.defineMetadata(metadata_constant_1.BASE.VALIDATE, rules, target.constructor);
    };
}
exports.Validate = Validate;
//# sourceMappingURL=Validate.decorator.js.map