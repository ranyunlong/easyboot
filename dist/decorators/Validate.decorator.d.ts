/**
 * @module Validate
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
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
export declare function Validate(validation: Validation | Validator | Array<Validation | Validator>): PropertyDecorator;
