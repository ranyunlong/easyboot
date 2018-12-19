import { Validation, Validator } from './Validation';
import { File } from '@easyboot/formidable'
import { HttpException } from '../core';

export class FileValidation<V extends Validator>  extends Validation<V> {
    public toValidate(file: File, field: string) {
        if (file) {
            if (!this.validator(file)) {
                throw new HttpException({
                    statusCode: 400,
                    data: {
                        msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof file}.`
                    }
                })
            }
        } else {
            if (this.validType === 'isRequired') {
                throw new HttpException({
                    statusCode: 400,
                    data: {
                        msg: this.message || `Parameter ${field} expected ${this.validType.replace('is', '')}, got ${typeof file}.`
                    }
                })
            }
        }
    }
}