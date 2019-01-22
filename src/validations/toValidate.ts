/**
 * @module toValidate
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { ValidationMetadata, Validation } from './Validation';
import { Validator } from './validators';
import { Ctor } from '../types/index.api';
import { BASE } from '../constants/metadata.constant';

 /**
  * validate
  * @param key
  * @param value
  * @param validations
  */
function validate(key: string, value: string, validations: Validation | Validator | Array<Validation | Validator>): any {
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

/**
 * validateEntity
 * validate entity
 * @param originData
 * @param Entity
 */
function validateEntity(originData: { [key: string]: any }, Entity?: Ctor) {
    const rules = Reflect.getMetadata(BASE.VALIDATE, Entity)
    const result: any = {}
    Object.keys(rules).forEach((key) => {
        const value = result[key] = originData[key]
        validate(key, value, rules[key])
    })
    return result
}

/**
 * toValidate
 * validate entity or validations
 * @param originData
 * @param metadata
 * @param Entity
 */
export function toValidate(originData: { [key: string]: any }, metadata: ValidationMetadata, Entity?: Ctor) {
    const result: any = {}
    if (Reflect.getMetadata(BASE.ENTITY, Entity)) return validateEntity(originData, Entity)
    const { key, validations, rules } = metadata
    if (key && validations) {
        const value = originData[key]
        validate(key, value, validations)
        return value;
    } else if (rules) {
        Object.keys(rules).forEach((key) => {
            const value = result[key] = originData[key]
            validate(key, value, rules[key])
        })
        return result
    }
    return originData
}