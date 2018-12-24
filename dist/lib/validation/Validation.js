"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
class Validation {
    constructor(message, validator, ...args) {
        this.message = message;
        this.validator = validator;
        this.validType = validator.name === 'validator' ? 'custom' : validator.name;
        const filters = args.filter((k) => k);
        if (filters.length > 0) {
            this.args = filters;
        }
    }
    toValidate(value, field) {
        if (value) {
            // check is not file
            if (typeof value === 'object')
                value = JSON.stringify(value);
            if (typeof value === 'number')
                value = String(value);
            if (this.args) {
                if (!this.validator(value, ...this.args)) {
                    throw new core_1.HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof value}.`
                        }
                    });
                }
            }
            else {
                if (!this.validator(value)) {
                    throw new core_1.HttpException({
                        statusCode: 400,
                        data: {
                            msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof value}.`
                        }
                    });
                }
            }
        }
        else {
            if (this.validType === 'isRequired') {
                throw new core_1.HttpException({
                    statusCode: 400,
                    data: {
                        msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof value}.`
                    }
                });
            }
        }
    }
}
exports.Validation = Validation;
