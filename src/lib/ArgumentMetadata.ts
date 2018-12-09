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