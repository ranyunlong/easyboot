import { ValidationMetadata, Validation } from './Validation';
import { Validator } from './validators';
import { Ctor } from '../types/index.api';
import { BASE } from '../constants/metadata.constant';

/**
 * @module toValidate
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

function validate(key: string, value: string, validations: Validation | Validator | Array<Validation | Validator>) {
    if (Array.isArray(validations)) {
        validations.forEach((validator) => {
            if (typeof validator === 'function') {
                validator().toValidate(value, key)
            } else {
                validator.toValidate(value, key)
            }
        })
    } else if (typeof validations === 'function') {
        validations().toValidate(value, key)
    } else {
        validations.toValidate(value, key)
    }
}

function validateEntity(originData: { [key: string]: any }, Entity?: Ctor) {
    const rules = Reflect.getMetadata(BASE.VALIDATE, Entity)
    const result: any = {}
    Object.keys(rules).forEach((key) => {
        const value = result[key] = originData[key]
        validate(key, value, rules[key])
    })
    return result
}

export function toValidate(originData: { [key: string]: any }, metadata: ValidationMetadata, entity?: Ctor) {
    const result: any = {}
    if (Array.isArray(entity)) return validateEntity(originData, entity[0])
    const { key, validations, rules } = metadata
    if (key && validations) {
        const value = result[key] = originData[key]
        validate(key, value, validations)
        return result;
    } else if (rules) {
        Object.keys(rules).forEach((key) => {
            const value = result[key] = originData[key]
            validate(key, value, rules[key])
        })
        return result
    }
    return originData
}