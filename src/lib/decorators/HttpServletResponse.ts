import { MetadataEnums } from '../enums';

export function HttpServletResponse(target: Object, propertyKey: string, parameterIndex: number): void {
    Reflect.defineMetadata(MetadataEnums.Metadata.RESPONSE, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey)
}