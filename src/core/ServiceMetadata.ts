import { ServletContext } from './ServletContext'
import * as pathToRegexp from 'path-to-regexp'

export class ServiceMetadata<T = any> {
    constructor(
        public readonly data: T,
        public readonly context: ServletContext
    ) {}
}

export interface MetadataFile {
    /**
     * Sets encoding for incoming form fields, default utf-8.
     */
    encoding?: string;
    /**
     * Sets the directory for placing file uploads in. You can move them later on using fs.rename(). The default is os.tmpdir().
     */
    uploadDir?: string;
    /**
     * If you want the files written to form.uploadDir to include the extensions of the original files, set this property to true.
     */
    keepExtensions?: boolean;
    /**
     * If you want check filetypes, set this to either file mimetypes.
     */
    fileType?: string | string[];
    /**
     * Either 'multipart' or 'urlencoded' depending on the incoming request.
     */
    type?: 'multipart' | 'urlencoded';
    /**
     * Limits the number of fields that the querystring parser will decode. Defaults to 1000 (0 for unlimited).
     */
    maxFields?: number;
    /**
     * Limits the size of uploaded file. If this value is exceeded, an 'error' event is emitted. The default size is 200MB.
     */
    maxFileSize?: number;
    /**
     * Limits the amount of memory all fields together (except files) can allocate in bytes. If this value is exceeded, an 'error' event is emitted. The default size is 20MB.
     */
    maxFieldsSize?: number;
    /**
     * If you want checksums calculated for incoming files, set this to either 'sha1' or 'md5'.
     */
    hash?: 'sha1' | 'md5' | boolean;
    /**
     * If this option is enabled, when you call form.parse, the files argument will contain arrays of files for inputs which submit multiple files using the HTML5 multiple attribute.
     */
    multiples?: boolean;
    /**
     * The amount of bytes received for this form so far.
     */
    bytesReceived?: number;
    /**
     * The expected number of bytes in this form.
     */
    bytesExpected?: number;
}

export interface MetadataParam {
    keys: pathToRegexp.Key[];
    regexp: RegExp;
    data?: any;
}

export interface MetadataQuery {
    [key: string]: any;
}