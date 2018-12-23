/**
 * @class BodyParserService
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 * @copyright Ranyunlong 2018-09-23 19:07
 */

import * as os from 'os'
import * as typeIs from 'type-is'
import * as parse from 'co-body'
import * as formidable from '@easyboot/formidable'
import { Context } from './Context';
import chalk from 'chalk';
import { UploadOptions } from '../decorators';
import { HttpException } from './HttpException';
import { contentType } from 'mime-types'
import { BodyParseConfiguration, FormMidableConfiguration } from '../configurations';

function showWarn() {
    if (process.env.NODE_ENV === 'development') {
        console.warn(chalk.yellowBright(`Warn: \nThe Application bodyparse mode is strict, GET|DELETE|HEAD|COPY|PURGE|UNLOCK request method cannot parse body.`))
        console.warn(chalk.yellowBright(`If you still want to parse, please set config strict: false.`))
        console.warn(chalk.yellowBright(`Read code: 'EasyBootServletConfiguration.ts' bodyparse option.`))
    }
}

export class BodyParserService {
    // The byte (if integer) limit of the JSON body, default 1mb
    public readonly jsonLimit: string
    // The byte (if integer) limit of the form body, default 56kb
    public readonly formLimit: string;
    // The byte (if integer) limit of the text body, default 56kb
    public readonly textLimit: string;
    // Sets encoding for incoming form fields, default utf-8
    public readonly encoding: 'utf-8' | string;
    // Parse multipart bodies, default false
    public readonly multipart: boolean;
    // Parse urlencoded bodies, default true
    public readonly urlencoded: boolean;
    // Parse text bodies, default true
    public readonly text: boolean;
    // Parse json bodies, default true
    public readonly json: boolean;
    // Toggles co-body strict mode; if set to true - only parses arrays or objects, default true
    public readonly jsonStrict: boolean;
    // Options to pass to the formidable multipart parser
    public readonly formidable: FormMidableConfiguration;
    //  If enabled, don't parse GET, HEAD, DELETE requests, default true
    public readonly strict: boolean;
    // // Sets the directory for placing file uploads in. You can move them later on using fs.rename(). The default is os.tmpdir().
    public readonly uploadDir: string;

    constructor(public opts: BodyParseConfiguration = new BodyParseConfiguration()) {
        this.encoding = opts.encoding || 'utf-8';
        this.formLimit = (opts.formLimit || 56) + 'kb'
        this.json = opts.json || true
        this.jsonLimit = (opts.jsonLimit || 56) + 'kb'
        this.textLimit = (opts.textLimit || 1) + 'mb'
        this.jsonStrict = opts.jsonStrict || true
        this.multipart = opts.multipart || true
        this.urlencoded = opts.urlencoded ||  true
        this.strict = opts.strict || true
        this.uploadDir = opts.uploadDir || os.tmpdir()
    }

    /**
     * parseBody
     * Parser body request data
     */
    public async parseBody(ctx: Context) {
        let body: any = {}
        if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(ctx.method) && this.strict) {
            showWarn()
            return body
        }
        if (typeIs(ctx.req, 'json') === 'json') {
            body = await parse.json(ctx.req, { limit: this.jsonLimit, strict: this.strict })
        }

        if (typeIs(ctx.req, 'urlencoded') === 'urlencoded') {
            body = await parse.form(ctx.req, { limit: this.formLimit, strict: this.strict })
        }

        if (typeIs(ctx.req, 'text') === 'text') {
            body = await parse.text(ctx.req, { limit: this.textLimit, strict: this.strict })
        }

        return body
    }

    /**
     * parseBody
     * Parser file request data
     */
    public async parseFile(ctx: Context, options?: UploadOptions): Promise<{
        [key: string]: any;
    } | undefined> {
        if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(ctx.method) && this.strict) {
            showWarn()
            return;
        };
        if (!typeIs(ctx.req, 'multipart')) return;
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm()
            form.uploadDir = this.uploadDir
            form.multiples = true
            form.encoding = this.encoding
            form.maxFileSize = 2 * 1024 * 1024
            const opts = { ...this.formidable, ...options }
            Object.keys(opts).forEach((key: keyof FormMidableConfiguration) => {
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
            form.parse(ctx.req, (err, fields, files) => {
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