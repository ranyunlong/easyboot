"use strict";
/**
 * @module entityValidator
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enums_1 = require("../enums");
const core_1 = require("../core");
function entityValidator(Entity, data) {
    const validations = Reflect.getMetadata(enums_1.MetadataEnums.Base.VALIDATORS, Entity);
    if (!Array.isArray(validations))
        return;
    // validator
    validations.forEach(({ validation, propertyKey }) => {
        validation.toValidate(data[propertyKey], propertyKey);
    });
    // deep validator
    if (typeof data === 'object' && !Array.isArray(data)) {
        const entity = new Entity();
        Object.keys(data).forEach((key) => {
            const metatype = Reflect.getOwnMetadata(enums_1.MetadataEnums.Base.TYPE, Entity.prototype, key);
            if (typeof metatype === 'function') {
                const result = entityValidator(metatype, data[key]);
                if (result) {
                    entity[key] = entityValidator(metatype, data[key]);
                }
                else if (metatype === Number && !isNaN(data[key])) {
                    entity[key] = Number(data[key]);
                }
                else if (data[key].constructor === metatype) {
                    entity[key] = data[key];
                }
                else if (metatype === Object) {
                    entity[key] = data[key];
                }
                else {
                    throw new core_1.HttpException({
                        statusCode: 400,
                        data: {
                            msg: `Parameter ${key} expected ${metatype.name}, got ${typeof data[key]}.`
                        }
                    });
                }
            }
            else {
                entity[key] = data[key];
            }
        });
        return entity;
    }
}
exports.entityValidator = entityValidator;
