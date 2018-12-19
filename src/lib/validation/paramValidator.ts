import { Validation } from './Validation';
import { HttpException } from '../core/HttpException';
import { CType } from '../decorators';

export function paramValidator(value: { [key: string]: any }, metadata: ParamMetadata) {
    const { rules, key } = metadata
    let { validations, metaType } = metadata
    if (rules) {
        let param: any;
        Object.keys(rules).forEach((key) => {
            param = value[key]
            let validations = rules[key]
            if (!validations) return;
            if (Array.isArray(validations)) {
                validations.forEach((validation) => {
                    if (typeof validation === 'function') validation = validation()
                    validation.toValidate(param, key)
                })
            } else {
                if (typeof validations === 'function') validations = validations()
                validations.toValidate(param, key)
            }
        })
        return param
    } else if (key && validations) {
        let param = value[key]
        if (Array.isArray(validations)) {
            validations.forEach((validation) => {
                if (typeof validation === 'function') validation = validation()
                validation.toValidate(param, key)
            })
        } else {
            if (typeof validations === 'function') validations = validations()
            validations.toValidate(param, key)
        }
        if (typeof metaType === 'function') {
            if (metaType === Number && !isNaN(param)) {
                param = Number(param)
            } else if (metaType !== Object) {
                if (param.constructor !== metaType) {
                    throw new HttpException({
                        statusCode: 400,
                        data: {
                            msg: `Parameter ${key} expected ${metaType.name}, got ${typeof param}.`
                        }
                    })
                }
            }
        }
        return param;
    } else if (key) {
        let param = value[key]
        if (metaType === Number && !isNaN(param)) {
            param = Number(param)
        } else if (typeof metaType === 'function') {
            if (param && param.constructor !== metaType) {
                throw new HttpException({
                    statusCode: 400,
                    data: {
                        msg: `Parameter ${key} expected ${metaType.name}, got ${typeof param}.`
                    }
                })
            }
        }
        return param
    }
    if (typeof metaType === 'function') {
        if (value && value.constructor !== metaType) {
            throw new HttpException({
                statusCode: 400,
                data: {
                    msg: `Parameter ${key} expected ${metaType.name}, got ${typeof value}.`
                }
            })
        }
    }
    return value
}

export interface ParamMetadata {
    index?: number;
    key?: string;
    metaType?: CType;
    validations?: Validator | Validation<any> | Array<Validation<any> | Validator>;
    rules: {
        [key: string]: Validator | Validation<any> | Array<Validation<any> | Validator> | null;
    };
}

export interface Validator {
    (...args: any[]): Validation<any>
}