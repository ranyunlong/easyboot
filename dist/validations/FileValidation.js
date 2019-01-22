"use strict";
/**
 * @class Validation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Validation_1 = require("./Validation");
const HttpException_1 = require("../core/HttpException");
class FileValidation extends Validation_1.Validation {
    toValidate(value, field) {
        if (typeof value !== 'undefined') {
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
exports.FileValidation = FileValidation;
//# sourceMappingURL=FileValidation.js.map