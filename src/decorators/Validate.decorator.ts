/**
 * @module Validate
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

 import { BASE } from '../constants/metadata.constant'
import { Validation } from '../validations/Validation';
import { Validator } from '../validations/validators';

/**
 * Validate decorator
 *
 * The decorator apply to Entity.
 *
 * Example
 * ```
 * @Entity
 * export class UserEntity {
 * }
 * ```
 */
export function Validate(validation: Validation | Validator | Array<Validation | Validator>): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        const rules = Reflect.getMetadata(BASE.VALIDATE, target.constructor) || {}
        rules[propertyKey] = validation
        Reflect.defineMetadata(BASE.VALIDATE, rules, target.constructor)
    }
}