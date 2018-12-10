import { MetadataElementTypes } from '../enums';

export function HttpServletResponse(target: Object, propertyKey: string, parameterIndex: number): void {
    Reflect.defineMetadata(MetadataElementTypes.Metadata.RESPONSE, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey)
}