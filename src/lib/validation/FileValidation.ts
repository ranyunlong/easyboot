import { Validation, Validator } from './Validation';
import { File } from 'formidable'

export class FileValidation<V extends Validator>  extends Validation<V> {
    public toValidate(file: File): boolean {
        if (this.args) {
            return this.validator(file, ...this.args)
        } else {
            return this.validator(file)
        }
    }
}