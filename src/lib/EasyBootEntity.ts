import { ArgumentMetadata } from './ArgumentMetadata';
import { HttpException } from './core/HttpException';

export class EasyBootEntity {
    private transform(value: any, metadata: ArgumentMetadata): any {
        const { validation, metatype, propertyKey } = metadata
        if (!validation.toValidate(value)) {
            throw new HttpException({
                statusCode: 400,
                message: `Invalid parameter ${propertyKey}`,
                data: {
                    msg: validation.message || `Parameter ${propertyKey} expected ${validation.validType.replace('is', '')}, got ${typeof value}.`
                }
            })
        }
        return value
    }
}