import { EasyBootEntity, IsRequired, IsLength, IsEmail, IsMobilePhone } from '../../../../../src';

export class UserEntity extends EasyBootEntity {
    @IsRequired('账户必须')
    @IsLength('账户长度必须6位以上', { min: 6 })
    public username: string;

    @IsRequired('密码必须')
    @IsLength('密码长度必须6位以上', { min: 6 })
    public password: string;

    @IsRequired('邮箱必须')
    @IsEmail('邮箱格式不正确')
    public email: string;

    @IsRequired('手机号码必须')
    @IsMobilePhone('手机格式不正确', 'zh-CN')
    public mobile: string;
}