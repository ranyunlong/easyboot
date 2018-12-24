import { File } from '@easyboot/formidable';
/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export declare class Validation<V extends Validator> {
    readonly message: string;
    readonly validator: V;
    readonly args: any[];
    readonly validType: string;
    constructor(message: string, validator: V, ...args: any[]);
    toValidate(value: any, field: string): void;
}
export interface Validator {
    (value: string | File, ...args: any[]): boolean;
}
