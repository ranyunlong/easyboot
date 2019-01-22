/**
 * @class ServletFileParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import * as typeIs from 'type-is'
import * as formidable from '@easyboot/formidable'
import { tmpdir } from 'os';
import { contentType } from 'mime-types'
import { ServletService } from '../core/ServletService';
import { ServiceMetadata, MetadataFile } from '../core/ServiceMetadata';
import { ServletContext } from '../core/ServletContext';
import { HttpException } from '../core/HttpException';

export class ServletFileParseService extends ServletService {
    constructor(public opts: Options = {}) {
        super('file')
    }
    public async onLaunch(metadata: ServiceMetadata<MetadataFile>): Promise<null | undefined | object> {
        return await this.parse(metadata.context, metadata.data)
    }

    public async parse(context: ServletContext, metadata: MetadataFile): Promise<object> {
        const {
            encoding = 'utf-8',
            uploadDir= tmpdir(),
            keepExtensions = false,
            type = 'multipart',
            maxFields = 1000,
            maxFileSize = 2 * 1024 * 1024,
            maxFieldsSize = 2 * 1024 * 1024,
            hash = false,
            multiples = true,
            bytesReceived,
            bytesExpected
        } = this.opts
        if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(context.method)) return;
        if (!typeIs(context.req, 'multipart')) return;
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm()
            const opts = {
                encoding,
                uploadDir,
                keepExtensions,
                type,
                maxFields,
                maxFileSize,
                maxFieldsSize,
                hash,
                multiples,
                bytesReceived,
                bytesExpected,
                ...metadata
            }

            Object.keys(opts).forEach((key: keyof Options) => {
                form[key] = opts[key]
            })

            form.onPart = function(part) {
                if (part.mime) {
                    let fileType = opts.fileType
                    if (Array.isArray(fileType)) {
                        if (!fileType.find((v) => contentType(v) === contentType(part.mime))) {
                            (form as any).pause()
                            reject(new HttpException({
                                statusCode: 400,
                                data: {
                                    msg: `The Request File key '${part.name}' type expected ${fileType.map((v) => `'${contentType(v)}'`).join(' or ')}, got ${part.mime}`
                                }
                            }))
                            return;
                        }
                    } else if (typeof fileType === 'string') {
                        if (contentType(fileType) !== contentType(part.mime)) {
                            (form as any).pause()
                            reject(new HttpException({
                                statusCode: 400,
                                data: {
                                    msg: `The Request File key '${part.name}' type expected ${contentType(fileType)}, got ${part.mime}`
                                }
                            }))
                        }
                        return;
                    }
                }
                form.handlePart(part)
            }
            form.parse(context.req, (err, fields, files) => {
                if (err) {
                    if (/maxFileSize exceeded/.test(err.message)) {
                        reject(new HttpException({
                            statusCode: 413,
                            data: {
                                msg: err.message
                            }
                        }))
                    }
                }
                resolve({
                    ...files,
                    ...fields
                })
            })
        })
    }
}

interface Options {
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
     * Either 'multipart' or 'urlencoded' depending on the incoming request.
     */
    type?: 'multipart' | 'urlencoded';

    /**
     * Limits the number of fields that the querystring parser will decode. Defaults to 1000 (0 for unlimited).
     */
    maxFields?: number;

    /**
     * Limits the size of uploaded file. If this value is exceeded, an 'error' event is emitted. The default size is 2MB.
     */
    maxFileSize?: number | string;

    /**
     * Limits the amount of memory all fields together (except files) can allocate in bytes. If this value is exceeded, an 'error' event is emitted. The default size is 2MB.
     */
    maxFieldsSize?: number | string;

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