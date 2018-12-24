/**
 * @class ArgumentMetadata
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { CType } from './decorators';
import { Validation } from './validation';
export declare class ArgumentMetadata {
    type?: 'body' | 'query' | 'param';
    metatype?: CType | undefined;
    validation?: Validation<any>;
    propertyKey?: string;
    constructor(type?: 'body' | 'query' | 'param', metatype?: CType | undefined, validation?: Validation<any>, propertyKey?: string);
}
