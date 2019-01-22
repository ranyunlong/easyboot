/**
 * @module toValidate
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { ValidationMetadata } from './Validation';
import { Ctor } from '../types/index.api';
/**
 * toValidate
 * validate entity or validations
 * @param originData
 * @param metadata
 * @param Entity
 */
export declare function toValidate(originData: {
    [key: string]: any;
}, metadata: ValidationMetadata, Entity?: Ctor): any;
