/**
 * @module Is
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

 import { BASE } from '../constants/metadata.constant'
 import * as validator from 'validator'

/**
 * Is decorator
 *
 * The decorator apply to Contorllor propertys, use to set response content type.
 *
 * Example
 * ```
 * @Entity
 * export class UserEntity {
 * }
 * ```
 */
export function Is(): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol): void => {
        Reflect.defineMetadata(BASE.IS, {
            //
        }, target.constructor, propertyKey)
    }
}