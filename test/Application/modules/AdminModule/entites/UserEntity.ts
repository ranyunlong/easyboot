import { EasyBootEntity, IsLength, IsRequired, IsInt } from '../../../../../src';

export class UserEntity extends EasyBootEntity {
    @IsInt('id必须位整数')
    public id: number;

    @IsRequired('账号必须')
    @IsLength('账号必须6-18位', { min: 6, max: 18 })
    public name: string;
}