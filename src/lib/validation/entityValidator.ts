/**
 * @module entityValidator
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CType } from '../decorators';
import { MetadataEnums } from '../enums';
import { HttpException } from '../core';
import { ArgumentMetadata } from '../ArgumentMetadata';

export function entityValidator(Entity: CType, data: any) {
    const validations = Reflect.getMetadata(MetadataEnums.Base.VALIDATORS, Entity)
    if (!Array.isArray(validations)) return;

    // validator
    validations.forEach(({validation, propertyKey}) => {
        validation.toValidate(data[propertyKey], propertyKey)
    })

    // deep validator
    if (typeof data === 'object' && !Array.isArray(data)) {
        const entity = new Entity()
        Object.keys(data).forEach((key) => {
            const metatype = Reflect.getOwnMetadata(MetadataEnums.Base.TYPE, Entity.prototype, key);
            let value: any;
            if (typeof metatype === 'function') {
                const result = entityValidator(metatype, data[key])
                if (result) {
                    value = entityValidator(metatype, data[key])
                } else if (metatype === Number && !isNaN(data[key])) {
                    value = Number(data[key])
                } else if (data[key].constructor === metatype) {
                    value = data[key]
                } else if (metatype === Object ) {
                    value = data[key]
                } else {
                    throw new HttpException({
                        statusCode: 400,
                        data: {
                            msg: `Parameter ${key} expected ${metatype.name}, got ${typeof data[key]}.`
                        }
                    })
                }
            } else {
                value = data[key]
            }

            if (typeof entity.transform === 'function') {
                entity[key] = entity.transform(value, new ArgumentMetadata(metatype, key))
            } else {
                entity[key] = value
            }
        })
        return entity
    }
}