import { IsLength, IsRequired, IsInt } from '../../../../../src';

export class MemberEntity {
    @IsInt('id必须位整数')
    public id: string;

    @IsRequired('账号必须')
    @IsLength('账号必须6-18位', { min: 3, max: 18 })
    public name: string;
}