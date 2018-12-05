/**
 * @module requestValidator
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 * @copyright Ranyunlong 2018-09-23 19:07
 */

import { RequestParameterDecoratorOptions } from '../Controller';
import { HttpException } from '../HttpException';
import { Rules } from './baseValidator';
import { EasyBootRequestArguments } from '../EasyBootRequestArguments';

export function requestValidator(type: 'query' | 'body' | 'param', data: any = {}, opts: RequestParameterDecoratorOptions): any {
    const { Entity, keys, rule, validators } = opts
    if (!Entity && !keys && !rule && validators) return data
    if (keys && validators) {
        const key = keys as string;
        const value = data[key]
        if (Array.isArray(validators)) {
            validators.forEach((validator) => {
                let valid: boolean = true
                const { options, message, validatorType } = validator
                if (options) {
                    valid = (validator as any).validator(String(value), options)
                } else {
                    valid = (validator as any).validator(String(value))
                }
                if (!valid) {
                    const error: any = {}
                    error[key] = message || `Invalid param, Expected ${validatorType.replace('is', '')}, got ${typeof value}.`
                    throw new HttpException({
                        data: error
                    })
                }
                return value
            })
        } else {
            const { options, message, validatorType } = validators
            let valid: boolean = true
            if (options) {
                let valid = (validators as any).validator(String(value), options)
            } else {
                valid = (validators as any).validator(String(value))
            }
            if (!valid) {
                const error: any = {}
                error[key] = message || `Invalid param, Expected ${validatorType.replace('is', '')}, got ${typeof value}.`
                throw new HttpException({
                    data: error
                })
            }
            return value
        }
    }
    if (Entity) {
        const rules: Rules = Entity.prototype.$rules || new Map()
        const entity = new Entity()
        rules.forEach((ruleCollection = new Set(), key) => {
            const value = data[key] || ''
            ruleCollection.forEach((rule) => {
                (entity as any)[key] = entity.transform(String(value), new EasyBootRequestArguments({
                    rule: rule as any,
                    key,
                    type
                }))
            })
        })
        if (entity.getError()) {
            throw new HttpException({
                data: entity.getError()
            })
        }
        return entity
    }
    if (keys) {
        if (Array.isArray(keys)) {
            const result: any = {}
            keys.forEach((k) => {
                result[k] = data[k]
            })
           return result
        } else {
            return data[keys]
        }
    }
}