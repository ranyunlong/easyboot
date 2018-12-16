import { MetadataEnums } from '../enums';
import { Validation } from '../validation';
import { Validator } from '../validation/paramValidator';

export function RequestBody(fields: { [key: string]: Validation<any> | Validator | Array<Validation<any> | Validator> | null }): ParameterDecorator;
export function RequestBody(key: string): ParameterDecorator;
export function RequestBody(key: string, validations: Validation<any> | Validator | Array<Validation<any> | Validator>): ParameterDecorator;
export function RequestBody(target: Object, propertyKey: string, parameterIndex: number): void;
export function RequestBody(...args: any[]): any {
    function decorator(target: Object, propertyKey: string, parameterIndex: number): void {
        const [key, validations] = args
        if (args.length === 2) {
            Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST_BODY, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey)
        } else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST_BODY, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey)
            } else if (typeof key === 'object') {
                // if (Array.isArray(key)) throw new DecoratorException(`Invalid fields in @RequestBody() decorator`, `@RequestBody`)
                Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST_BODY, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey)
            }
        } else {
            Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST_BODY, {
                index: parameterIndex
            }, target.constructor, propertyKey)
        }
    }
    if (args.length === 3) {
        return (decorator as any)(...args)
    } else {
        return decorator
    }
}