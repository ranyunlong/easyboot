import { EasyBootEntity, EasyBootRequestArguments, IsLength, Entity, IsString, IsRequired, IsInt, IsBase64 } from '../../../../../src'
import { HexBase64Latin1Encoding } from 'crypto';

@Entity
export class UserEntity extends EasyBootEntity {
    public transform(value: string, requestArgument: EasyBootRequestArguments) {
        return;
    }

    @IsLength('账号必须3-6位', { min: 3, max: 6})
    @IsString('账号必须为字符串')
    @IsRequired('账号必须')
    public username: string;

    @IsLength('密码必须6-20位', { min: 6, max: 20})
    @IsRequired('密码必须')
    public password: string;

    @IsInt('状态必须为整数')
    public status: 0 | 1;

    @IsBase64('用户头像必须为base64')
    public upic: HexBase64Latin1Encoding;
}