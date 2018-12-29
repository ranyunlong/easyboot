import { Entity } from '../../../../../src';

@Entity
export class ArrayNumberEntity extends Array<Number> {
    constructor(...args: Number[]) {
        super(...args)
    }
}