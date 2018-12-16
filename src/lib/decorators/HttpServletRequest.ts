import { MetadataEnums } from '../enums';

export function HttpServletRequest(target: Object, propertyKey: string, parameterIndex: number): void {
    Reflect.defineMetadata(MetadataEnums.Metadata.REQUEST, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey)
}