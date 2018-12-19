import { File } from '@easyboot/formidable';
import { HttpException } from '../core';

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
    public toValidate(value: any, field: string) {
        if (value) {
            // check is not file
            if (typeof value === 'object') value = JSON.stringify(value)
            if (typeof value === 'number') value = String(value)
            if (this.args) {
                if (!this.validator(value, ...this.args)) {
                    throw new HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof value}.`
                        }
                    })
                }
            } else {
                if (!this.validator(value)) {
                    throw new HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof value}.`
                        }
                    })
                }
            }
        } else {
            if (this.validType === 'isRequired') {
                throw new HttpException({
                    statusCode: 400,
                    data: {
                        msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof value}.`
                    }
                })
            }
        }
    }
}

export interface Validator {
    (value: string | File, ...args: any[]): boolean;
}