import { tmpdir } from 'os'
export class FormMidableConfiguration {
    // Sets encoding for incoming form fields, default utf-8.
    public encoding?: string = 'utf-8'
    // Sets the directory for placing file uploads in. You can move them later on using fs.rename(). The default is os.tmpdir().
    public uploadDir?: string = tmpdir()
    // If you want the files written to form.uploadDir to include the extensions of the original files, set this property to true.
    public keepExtensions?: boolean = false;
    // Either 'multipart' or 'urlencoded' depending on the incoming request.
    public type?: 'multipart' | 'urlencoded' = 'multipart'
    // Limits the number of fields that the querystring parser will decode. Defaults to 1000 (0 for unlimited).
    public maxFields?: number = 1000
    // Limits the size of uploaded file. If this value is exceeded, an 'error' event is emitted. The default size is 2MB.
    public maxFileSize?: number | string = 2 * 1024 * 1024;
    // Limits the amount of memory all fields together (except files) can allocate in bytes. If this value is exceeded, an 'error' event is emitted. The default size is 2MB.
    public maxFieldsSize?: number | string = 2 * 1024 * 1024;
    // If you want checksums calculated for incoming files, set this to either 'sha1' or 'md5'.
    public hash?: 'sha1' | 'md5' | boolean = false;
    // If this option is enabled, when you call form.parse, the files argument will contain arrays of files for inputs which submit multiple files using the HTML5 multiple attribute.
    public multiples?: boolean = true;
    // The amount of bytes received for this form so far.
    public bytesReceived?: number;
    // The expected number of bytes in this form.
    public bytesExpected?: number;
}