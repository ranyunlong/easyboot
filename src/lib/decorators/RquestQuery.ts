import { MetadataEnums } from '../enums';
import { Validation } from '../validation';
import { Validator } from '../validation/paramValidator';

export function RquestQuery(fields: { [key: string]: Validation<any> | Validator | Array<Validation<any> | Validator> | null }): ParameterDecorator;
export function RquestQuery(key: string): ParameterDecorator;
export function RquestQuery(key: string, validations: Validation<any> | Validator | Array<Validation<any> | Validator>): ParameterDecorator;
export function RquestQuery(target: Object, propertyKey: string, parameterIndex: number): void;
export function RquestQuery(...args: any[]): any {
    function decorator(target: Object, propertyKey: string, parameterIndex: number): void {
        const [key, validations] = args
        if (args.length === 2) {
            Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST_QUERY, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey)
        } else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST_QUERY, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey)
            } else if (typeof key === 'object') {
                // if (Array.isArray(key)) throw new DecoratorException(`Invalid fields in @RquestQuery() decorator`, `@RquestQuery`)
                Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST_QUERY, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey)
            }
        } else {
            Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST_QUERY, {
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