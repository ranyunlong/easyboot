import { ValidatorFc } from './base';
import { HttpException } from '../core/HttpException';

function valueValidate(value: string, options: any, valid: ValidatorFc): boolean {
    // was boolean or number
    if (/(boolean|number)/.test(typeof value)) {
        value = String(value)
    }
    // was null or undefined
    if (!value) value = ''

    if (options) {
        return (valid as any)(value, options)
    } else {
        return (valid as any)(value)
    }
}

export function validate(originData: any = {}, validation: Validation) {
    const { index, key, validators, rules } = validation
    if (key && validators) {
        const value = originData[key]
        if (Array.isArray(validators)) {
            validators.forEach((valid) => {
                if (typeof valid === 'function') {
                    valid = valid()
                    const { message, options, validator, validatorType } = valid
                    const data: any = {}
                    data['msg'] = message || `Parameter ${key} expected ${validatorType.replace('is', '')}, got ${typeof value}.`
                    if (!valueValidate(value, options, validator)) {
                        throw new HttpException({
                            message: `Invalid path parameter ${key}`,
                            statusCode: 404,
                            data
                        })
                    }
                }
            })
        } else {
            let valid = validators
            if (typeof validators === 'function') {
                valid = validators()
            }
            const { message, options, validator, validatorType } = valid
            const data: any = {}
                data['msg'] = message || `Parameter ${key} expected ${validatorType.replace('is', '')}, got ${typeof value}.`
            if (!valueValidate(value, options, validator)) {
                throw new HttpException({
                    message: `Invalid path parameter ${key}`,
                    statusCode: 404,
                    data
                })
            }
        }
        return value
    }

    if (rules) {
        const values: any = {}
        Object.keys(rules).forEach((key) => {
            values[key] = originData[key]
            let rule = rules[key]
            if (Array.isArray(rule)) {
                rule.forEach((valid) => {
                    if (typeof valid === 'function') {
                        valid = valid()
                    }
                    const { message, options, validator, validatorType } = valid
                    if (!valueValidate(values[key], options, validator)) {
                        const data: any = {}
                        data['msg'] = message || `Parameter ${key} expected ${validatorType.replace('is', '')}, got ${typeof values[key]}.`
                        throw new HttpException({
                            message: `Invalid path parameter ${key}`,
                            statusCode: 404,
                            data
                        })
                    }
                })
            } else {
                if (typeof rule === 'function') rule = rule()
                const { message, options, validator, validatorType } = rule
                if (!valueValidate(values[key], options, validator)) {
                    const data: any = {}
                    data['msg'] = message || `Parameter ${key} expected ${validatorType.replace('is', '')}, got ${typeof values[key]}.`
                    throw new HttpException({
                        message: `Invalid path parameter ${key}`,
                        statusCode: 404,
                        data
                    })
                }
            }
        })

        return values
    }
}

interface Validation {
    index?: number;
    key?: string;
    validators?: any;
    rules: { [key: string]: any };
}