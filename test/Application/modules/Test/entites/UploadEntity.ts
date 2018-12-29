import { IsInt, IsRequired, File } from '../../../../../src';

export class UploadEntity {
    @IsInt
    @IsRequired
    public id: string;

    @IsRequired
    public file: File;
}