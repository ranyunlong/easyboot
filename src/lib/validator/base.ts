/**
 * @module baseValidator
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 * @copyright Ranyunlong 2018-09-23 19:07
 */

import * as validator from 'validator'
import { MetadataElementTypes } from '../enums';

(validator as any).isString = function(value: string) {
    return typeof value === 'string'
};

(validator as any).isRequired = function(value: string) {
    return !validator.isEmpty(value)
};

(validator as any).isArray = function(values: string[]) {
    return Array.isArray(values)
}

export function baseValidator(validatorType: ValidatorType, message: string, options: any = null): PropertyDecorator {
    return (target: any, propertyKey: string): void => {
        // const type = Reflect.getMetadata('design:type', target, propertyKey)
        const metadatas = Reflect.getMetadata(MetadataElementTypes.Metadata.VALIDATORS, target, propertyKey) || []
        Reflect.defineMetadata(MetadataElementTypes.Metadata.VALIDATORS, [...metadatas, {
            validatorType,
            validator: validator[validatorType],
            message,
            options,
            propertyKey
        }], target, propertyKey)
    }
}

export function baseTestValidator(validatorType: ValidatorType, message: string, options: any = null): Validator {
    return {
        message,
        options,
        validator: validator[validatorType],
        validatorType
    }
}

export interface Validator {
    message?: string;
    options?: any;
    validator?: ValidatorFc;
    validatorType?: ValidatorType | 'isString' | 'isRequired' | 'isArray';
    propertyKey?: string;
    type?: string;
}
export type ValidatorType = keyof ValidatorJS.ValidatorStatic;
export type ValidatorFc = ValidatorJS.ValidatorStatic[ValidatorType]