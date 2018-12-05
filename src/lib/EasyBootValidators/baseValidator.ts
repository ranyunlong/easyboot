/**
 * @module baseValidator
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 * @copyright Ranyunlong 2018-09-23 19:07
 */

import * as validator from 'validator'
import { Validator } from '../Router/Route';

(validator as any).isString = function(value: string) {
    return typeof value === 'string'
};

(validator as any).isRequired = function(value: string) {
    return !validator.isEmpty(value)
};

(validator as any).isArray = function(values: string[]) {
    return Array.isArray(values)
}

export function baseValidator(validatorType: keyof ValidatorJS.ValidatorStatic, message: string, options: any = null): PropertyDecorator {
    return (target: any, propertyKey: string): void => {
        const rules: Rules = target.$rules || new Map<string, Set<ValidatorFn>>()
        if (rules.has(propertyKey)) {
            const rule = rules.get(propertyKey)
            rule.add({
                validator: function(value: string) {
                    if (options) {
                        return (validator[validatorType]  as any)(value, options)
                    } else {
                        return (validator[validatorType]  as any)(value)
                    }
                },
                options,
                message
            })
        } else {
            const rule: Rule = new Set()
            rule.add({
                validator: function(value: string) {
                    if (options) {
                        return (validator[validatorType]  as any)(value, options)
                    } else {
                        return (validator[validatorType]  as any)(value)
                    }
                },
                options,
                message
            })
            rules.set(propertyKey, rule)
        }
        target.$rules = rules
    }
}

export function baseTestValidator(validatorType: keyof ValidatorJS.ValidatorStatic, message: string, options: any = null): Validator {
    return {
        message,
        options,
        validator: validator[validatorType],
        validatorType
    }
}

export interface RuleItem {
    validator: (value: string, options: any) => boolean;
    options: any;
    message: string;
}

export type Rule = Set<{
    validator: ValidatorFn;
    options: any;
    message: string;
}>;
export type Rules = Map<string, Rule>;
export type ValidatorType = keyof ValidatorJS.ValidatorStatic;
export type ValidatorFn = ValidatorJS.ValidatorStatic[ValidatorType]