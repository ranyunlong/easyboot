/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { Validation } from './Validation';
import { HttpException } from '../core/HttpException';

export class FileValidation extends Validation {
    public toValidate(value: File, field: string) {
        if (typeof value !== 'undefined') {
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