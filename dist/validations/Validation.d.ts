/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Validator } from './validators';
export declare class Validation {
    readonly typeId: string;
    readonly message: string;
    readonly validator: (value: any, ...args: any[]) => boolean;
    readonly required: boolean;
    readonly opts?: any[];
    constructor(typeId: string, message: string, validator: (value: any, ...args: any[]) => boolean, required: boolean, opts?: any[]);
    toValidate(value: any, field: string): void;
}
export interface ValidationMetadata {
    index: number;
    key?: string;
    validations?: Validation | Validator | Array<Validation | Validator>;
    rules?: {
        [key: string]: Validation | Validator | Array<Validation | Validator>;
    };
}
