import { EasyBootEntity, IsInt, IsRequired } from '../../../../../src';

export class UserQueryEntity extends EasyBootEntity {
    @IsInt('用户id必须为整数')
    public userId: number = 0;
    public username: string = '';
    public sortFiled: string = 'userId';

    @IsRequired('limit 必须')
    @IsInt('limit 必须为整数')
    public limit: number;

    @IsRequired('page必须')
    @IsInt('page 必须为整数')
    public page: number;
}