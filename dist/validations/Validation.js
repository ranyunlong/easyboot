"use strict";
/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = require("../core/HttpException");
class Validation {
    constructor(typeId, message, validator, required, opts) {
        this.typeId = typeId;
        this.message = message;
        this.validator = validator;
        this.required = required;
        this.opts = opts;
    }
    toValidate(value, field) {
        if (typeof value !== 'undefined') {
            if (typeof value === 'object')
                value = JSON.stringify(value);
            if (typeof value === 'number')
                value = String(value);
            if (typeof value === 'boolean')
                value ? value = 'true' : value = 'false';
            if (this.opts && this.opts.length > 0) {
                if (!this.validator(value, ...this.opts)) {
                    throw new HttpException_1.HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.typeId}, got ${typeof value}.`
                        }
                    });
                }
            }
            else {
                if (!this.validator(value)) {
                    throw new HttpException_1.HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.typeId}, got ${typeof value}.`
                        }
                    });
                }
            }
        }
        else {
            if (this.required) {
                throw new HttpException_1.HttpException({
                    statusCode: 400,
                    data: {
                        msg: this.message || `Parameter ${field} expected ${this.typeId}, got ${typeof value}.`
                    }
                });
            }
        }
    }
}
exports.Validation = Validation;
//# sourceMappingURL=Validation.js.map