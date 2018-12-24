
/**
 * @class ArgumentMetadata
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CType } from './decorators';

export class ArgumentMetadata {
    constructor(
        public metatype?: CType | undefined,
        public propertyKey?: string
    ) {}
}