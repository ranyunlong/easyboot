import { MetadataElementTypes } from '../enums';
import { Validator } from '../validator/base';
import { ValidatorFn } from '../validator/validators'
import { DecoratorException } from '../exception';

export function RequestParam(fields: { [key: string]: ValidatorFn | ValidatorFn[] | Validator | Validator[]}): ParameterDecorator;
export function RequestParam(key: string): ParameterDecorator;
export function RequestParam(key: string, validators: ValidatorFn | ValidatorFn[] | Validator | Validator[]): ParameterDecorator;
export function RequestParam(target: Object, propertyKey: string, parameterIndex: number): void;
export function RequestParam(...args: any[]): any {
    function decorator(target: Object, propertyKey: string, parameterIndex: number): void {
        const [key, validators] = args
        if (args.length === 2) {
            Reflect.defineMetadata(MetadataElementTypes.Metadata.REQUEST_PARAM, {
                index: parameterIndex,
                key,
                validators
            }, target.constructor, propertyKey)
        } else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(MetadataElementTypes.Metadata.REQUEST_PARAM, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey)
            } else if (typeof key === 'object') {
                if (Array.isArray(key)) throw new DecoratorException(`Invalid fields in @RequestParam() decorator`, `@RequestParam`)
                Reflect.defineMetadata(MetadataElementTypes.Metadata.REQUEST_PARAM, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey)
            }
        } else {
            Reflect.defineMetadata(MetadataElementTypes.Metadata.REQUEST_PARAM, {}, target.constructor, propertyKey)
        }
    }
    if (args.length === 3) {
        return (decorator as any)(...args)
    } else {
        return decorator
    }
}