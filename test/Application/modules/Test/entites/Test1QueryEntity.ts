import { IsInt, IsRequired } from '../../../../../src';

export class Test1QueryEntity {

    @IsRequired
    public token: string;

    @IsInt
    @IsRequired('page 必须')
    public page: string;

    @IsInt
    @IsRequired('limit 必须')
    public limit: string;

    @IsRequired
    public sort: string = 'xx'
}