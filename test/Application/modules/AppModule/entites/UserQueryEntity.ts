import { EasyBootEntity, IsInt, IsRequired, isRequired } from '../../../../../src';

export class UserQueryEntity {
    @IsInt('用户id必须为整数')
    public userId: number = 0;
    public username: string;
    public sortFiled: string = 'userId';

    @IsRequired
    @IsInt('limit 必须为整数')
    public limit: number;

    @IsRequired
    @IsInt('page 必须为整数')
    public page: number;
}