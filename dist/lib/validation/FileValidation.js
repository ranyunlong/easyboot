"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validation_1 = require("./Validation");
const core_1 = require("../core");
class FileValidation extends Validation_1.Validation {
    toValidate(file, field) {
        if (file) {
            if (!this.validator(file)) {
                throw new core_1.HttpException({
                    statusCode: 400,
                    data: {
                        msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof file}.`
                    }
                });
            }
        }
        else {
            if (this.validType === 'isRequired') {
                throw new core_1.HttpException({
                    statusCode: 400,
                    data: {
                        msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof file}.`
                    }
                });
            }
        }
    }
}
exports.FileValidation = FileValidation;
