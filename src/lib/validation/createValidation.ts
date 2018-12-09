/**
 * @module createValidation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { Validation, Validator } from './Validation'

export function createValidation<T extends Validator>(message: string, validator: T, ...args: any[]): Validation<T> {
    return new Validation<T>(message, validator, ...args)
}