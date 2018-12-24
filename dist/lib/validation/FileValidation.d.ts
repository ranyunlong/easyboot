import { Validation, Validator } from './Validation';
import { File } from '@easyboot/formidable';
export declare class FileValidation<V extends Validator> extends Validation<V> {
    toValidate(file: File, field: string): void;
}
