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

export function requestValidator(type: 'query' | 'body' | 'param', data: any = {}, opts: RequestParameterDecoratorOptions, index: number): any {
    const { Entity, keys, rule, validators, parameterTypes = [] } = opts
    const parameterType = parameterTypes[index]
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
            if (parameterType) {
                if (/Number/.test(parameterType.name)) {
                    if (typeof value !== 'number') {
                        return Number(value)
                    }
                }

                if (/String/.test(parameterType.name)) {
                    if (typeof value !== 'string') {
                        return String(value)
                    }
                }

                if (/Boolean/.test(parameterType.name)) {
                    if (typeof value !== 'boolean') {
                        return Boolean(value)
                    }
                }
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
                let d: any = entity.transform(value, new EasyBootRequestArguments({
                    rule: rule as any,
                    key,
                    type
                }));
                if (rule.type) {
                     // 格式化数据类型 针对number&string 类型不能识别
                    if (/Number/.test(rule.type.name)) {
                        if (typeof d !== 'number') d = Number(d)
                    }
                    if (/String/.test(rule.type.name)) {
                        if (typeof d !== 'string') d = String(d)
                    }
                    if (/Boolean/.test(rule.type.name)) {
                        if (typeof d !== 'boolean') d = Boolean(d)
                    }
                    ; (entity as any)[key] = d
                }
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