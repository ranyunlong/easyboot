import { File } from 'formidable';

/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export class Validation<V extends Validator> {
    public readonly args: any[];
    public readonly validType: string;
    constructor(public readonly message: string, public readonly validator: V, ...args: any []) {
        this.validType = validator.name === 'validator' ? 'custom' : validator.name
        const filters = args.filter((k) => k)
        if (filters.length > 0) {
            this.args = filters
        }
    }
    public toValidate(value: any): boolean {
        if (value) {
            // check is not file
            if (typeof value === 'object') value = JSON.stringify(value)
            if (typeof value === 'number') value = String(value)
            if (this.args) {
                return this.validator(value, ...this.args)
            } else {
                return this.validator(value)
            }
        } else {
            if (this.validType === 'isRequired') return false;
            return true
        }
    }
}

export interface Validator {
    (value: string | File, ...args: any[]): boolean;
}