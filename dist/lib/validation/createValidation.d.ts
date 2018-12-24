/**
 * @module createValidation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Validation, Validator } from './Validation';
export declare function createValidation<T extends Validator>(message: string, validator: T, ...args: any[]): Validation<T>;
