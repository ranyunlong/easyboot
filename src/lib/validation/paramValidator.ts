import { Validation } from './Validation';
import { HttpException } from '../core/HttpException';

export function toValidator(param: string, key: string, validation: Validation<any>) {
    const { message, validType } = validation
    if (!validation.toValidate(param)) {
        throw new HttpException({
            statusCode: 400,
            message: `Invalid parameter ${key}`,
            data: {
                msg: message || `Parameter ${key} expected ${validType.replace('is', '')}, got ${typeof param}.`
            }
        })
    }
}

export function paramValidator(value: { [key: string]: string }, metadata: ParamMetadata) {
    const { rules, key } = metadata
    let { validations } = metadata
    if (rules) {
        let param: any;
        Object.keys(rules).forEach((key) => {
            param = value[key]
            let validations = rules[key]
            if (!validations) return;
            if (Array.isArray(validations)) {
                validations.forEach((validation) => {
                    if (typeof validation === 'function') validation = validation()
                    toValidator(param, key, validation)
                })
            } else {
                if (typeof validations === 'function') validations = validations()
                toValidator(param, key, validations)
            }
        })
        return param
    } else if (key && validations) {
        const param = value[key]
        if (Array.isArray(validations)) {
            validations.forEach((validation) => {
                if (typeof validation === 'function') validation = validation()
                toValidator(param, key, validation)
            })
        } else {
            if (typeof validations === 'function') validations = validations()
            toValidator(param, key, validations)
        }
        return param;
    }
    return value
}

export interface ParamMetadata {
    index?: number;
    key?: string;
    validations?: Validator | Validation<any> | Array<Validation<any> | Validator>;
    rules: {
        [key: string]: Validator | Validation<any> | Array<Validation<any> | Validator> | null;
    };
}

export interface Validator {
    (...args: any[]): Validation<any>
}