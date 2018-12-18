/**
 * @class ArgumentMetadata
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CType } from './decorators';
import { Validation } from './validation';

export class ArgumentMetadata {
    constructor(
        public type?: 'body' | 'query' | 'param',
        public metatype?: CType | undefined,
        public validation?: Validation<any>,
        public propertyKey?: string
    ) {}
}