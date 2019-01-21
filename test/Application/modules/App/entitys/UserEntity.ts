import { Entity, Validate, isRequired, isEmail, isURL } from '../../../../../src';

@Entity
export class UserEntity {
    @Validate(isRequired)
    public username: string;

    @Validate([isRequired, isEmail])
    public email: string;

    @Validate([isRequired, isURL])
    public upic: string;
}