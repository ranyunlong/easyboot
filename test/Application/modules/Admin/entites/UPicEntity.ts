import { IsRequired, File, IsFile } from '../../../../../src';

export class UPicEntity {
    @IsRequired
    @IsFile('必须为文件')
    public uPic: File;

    @IsRequired('必须填写用户名称')
    public name: string;
}