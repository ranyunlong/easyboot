/**
 * @module RquestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums } from '../enums';
import 'reflect-metadata';

/**
 * Upload decorator
 *
 * The decorator apply to Contorllor propertys, use to set response status message.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public async index(){}
 *
 *     @Upload
 *     public async test(@RequestBody('upic') file: File){}
 *
 *     @Upload({ encoding: 'utf-8', maxFileSize: 2 * 1024 * 1024, fileType: 'jpg'})
 *     public async test1(@RequestBody({'upic', IsFile}) file: any){}
 *
 *     @Upload({ encoding: 'utf-8', maxFileSize: 2 * 1024 * 1024, fileType: ['jpg', 'png', 'gif']})
 *     public async test1(@RequestBody file: FileEntity){}
 * }
 * ```
 */
export function Upload(options: UploadOptions): MethodDecorator;
export function Upload<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function Upload(...args: any[]): any {
    if (args.length === 1) {
        return <T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void => {
            Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_FILE, args[0], target.constructor, propertyKey)
        }
    } else {
        const [ target, propertyKey, descriptor ] = args
        Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_FILE, {}, target.constructor, propertyKey)
    }
}

export interface UploadOptions {
    encoding?: string;                  // Sets encoding for incoming form fields, default utf-8.
    uploadDir?: string;                 // Sets the directory for placing file uploads in. You can move them later on using fs.rename(). The default is os.tmpdir().
    keepExtensions?: boolean;           // If you want the files written to form.uploadDir to include the extensions of the original files, set this property to true.
    fileType?: string | string[];                  // If you want check filetypes, set this to either file mimetypes.
    type?: 'multipart' | 'urlencoded';  // Either 'multipart' or 'urlencoded' depending on the incoming request.
    maxFields?: number;                 // Limits the number of fields that the querystring parser will decode. Defaults to 1000 (0 for unlimited).
    maxFileSize?: number;               // Limits the size of uploaded file. If this value is exceeded, an 'error' event is emitted. The default size is 200MB.
    maxFieldsSize?: number;             // Limits the amount of memory all fields together (except files) can allocate in bytes. If this value is exceeded, an 'error' event is emitted. The default size is 20MB.
    hash?: 'sha1' | 'md5' | boolean;    // If you want checksums calculated for incoming files, set this to either 'sha1' or 'md5'.
    multiples?: boolean;                // If this option is enabled, when you call form.parse, the files argument will contain arrays of files for inputs which submit multiple files using the HTML5 multiple attribute.
    bytesReceived?: number;             // The amount of bytes received for this form so far.
    bytesExpected?: number;             // The expected number of bytes in this form.
}