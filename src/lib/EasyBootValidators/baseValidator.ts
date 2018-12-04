import * as validator from 'validator'

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

type Rule = Set<{
    validator: ValidatorFn;
    options: any;
    message: string;
}>;
type Rules = Map<string, Rule>;
type ValidatorType = keyof ValidatorJS.ValidatorStatic;
type ValidatorFn = ValidatorJS.ValidatorStatic[ValidatorType]