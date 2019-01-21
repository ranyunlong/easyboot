/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { HttpException } from '../core/HttpException';
import { Validator } from './validators';

export class Validation {
    constructor(
        public readonly typeId: string,
        public readonly message: string,
        public readonly validator: (value: string, ...args: any[]) => boolean,
        public readonly required: boolean,
        public readonly opts?: any[]
    ) {}
    public toValidate(value: string, field: string) {
        if (typeof value !== 'undefined') {
            if (typeof value === 'object') value = JSON.stringify(value)
            if (typeof value === 'number') value = String(value)
            if (typeof value === 'boolean') value ? value = 'true' : value = 'false'
            if (this.opts && this.opts.length > 0) {
                if (!this.validator(value, ...this.opts)) {
                    throw new HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.typeId}, got ${typeof value}.`
                        }
                    })
                }
            } else {
                if (!this.validator(value)) {
                    throw new HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.typeId}, got ${typeof value}.`
                        }
                    })
                }
            }
        } else {
            if (this.required) {
                throw new HttpException({
                    statusCode: 400,
                    data: {
                        msg: this.message || `Parameter ${field} expected ${this.typeId}, got ${typeof value}.`
                    }
                })
            }
        }
    }
}

export interface ValidationMetadata {
    index: number;
    key?: string;
    validations?: Validation | Validator | Array<Validation | Validator>;
    rules?: {
        [key: string]: Validation | Validator | Array<Validation | Validator>;
    }
}