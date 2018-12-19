/**
 * @module entityValidator
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums } from '../enums';
import { CType } from '../decorators';
import { HttpException } from '../core';

export function entityValidator(Entity: CType, data: any) {
    const validations =  Reflect.getMetadata(MetadataEnums.Base.VALIDATORS, Entity)
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
            if (typeof metatype === 'function') {
                const result = entityValidator(metatype, data[key])
                if (result) {
                    entity[key] = entityValidator(metatype, data[key])
                } else if (metatype === Number && !isNaN(data[key])) {
                    entity[key] = Number(data[key])
                } else if (data[key].constructor === metatype) {
                    entity[key] = data[key]
                } else if (metatype === Object ) {
                    entity[key] = data[key]
                } else {
                    throw new HttpException({
                        statusCode: 400,
                        data: {
                            msg: `Parameter ${key} expected ${metatype.name}, got ${typeof data[key]}.`
                        }
                    })
                }
            } else {
                entity[key] = data[key]
            }
        })
        return entity
    }
}