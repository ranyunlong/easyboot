"use strict";
/**
 * @module toValidate
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
/**
 * validate
 * @param key
 * @param value
 * @param validations
 */
function validate(key, value, validations) {
    if (Array.isArray(validations)) {
        validations.forEach((validator) => {
            if (typeof validator === 'function') {
                validator().toValidate(value, key);
            }
            else {
                validator.toValidate(value, key);
            }
        });
    }
    else if (typeof validations === 'function') {
        validations().toValidate(value, key);
    }
    else {
        validations.toValidate(value, key);
    }
}
/**
 * validateEntity
 * validate entity
 * @param originData
 * @param Entity
 */
function validateEntity(originData, Entity) {
    const rules = Reflect.getMetadata(metadata_constant_1.BASE.VALIDATE, Entity);
    const result = {};
    Object.keys(rules).forEach((key) => {
        const value = result[key] = originData[key];
        validate(key, value, rules[key]);
    });
    return result;
}
/**
 * toValidate
 * validate entity or validations
 * @param originData
 * @param metadata
 * @param Entity
 */
function toValidate(originData, metadata, Entity) {
    const result = {};
    if (Reflect.getMetadata(metadata_constant_1.BASE.ENTITY, Entity))
        return validateEntity(originData, Entity);
    const { key, validations, rules } = metadata;
    if (key && validations) {
        const value = originData[key];
        validate(key, value, validations);
        return value;
    }
    else if (rules) {
        Object.keys(rules).forEach((key) => {
            const value = result[key] = originData[key];
            validate(key, value, rules[key]);
        });
        return result;
    }
    return originData;
}
exports.toValidate = toValidate;
//# sourceMappingURL=toValidate.js.map