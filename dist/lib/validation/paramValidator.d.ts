import { Validation } from './Validation';
import { CType } from '../decorators';
export declare function paramValidator(value: {
    [key: string]: any;
}, metadata: ParamMetadata): any;
export interface ParamMetadata {
    index?: number;
    key?: string;
    metaType?: CType;
    validations?: Validator | Validation<any> | Array<Validation<any> | Validator>;
    rules: {
        [key: string]: Validator | Validation<any> | Array<Validation<any> | Validator> | null;
    };
}
export interface Validator {
    (...args: any[]): Validation<any>;
}
