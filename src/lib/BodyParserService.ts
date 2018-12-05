/**
 * @class BodyParserService
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 * @copyright Ranyunlong 2018-09-23 19:07
 */

import * as os from 'os'
import * as typeIs from 'type-is'
import * as parse from 'co-body'
import * as formidable from 'formidable'
import { Context } from './Context';

export class BodyParserService {
    // JSON正文的字节限制 默认值1mb
    public readonly jsonLimit: string
    // 表单主体数据的限制 默认值56kb
    public readonly formLimit: string;
    // 文本正文的字节限制 默认值56kb
    public readonly textLimit: number;
    // 编码格式 默认 utf-8
    public readonly encoding: 'utf-8' | string;
    // 开启 multipart 默认true
    public readonly multipart: boolean;
    // 解析 urlencoded  默认true
    public readonly urlencoded: boolean;
    // 解析text 默认true
    public readonly text: boolean;
    // 解析json 默认true
    public readonly json: boolean;
    // json只解析数组和对象 默认true
    public readonly jsonStrict: boolean;
    // formidable 选项
    public readonly formidable: FormMidable;
    // 开启严格模式 不解析GET HEAD DELETE请求 默认true
    public readonly strict: boolean;
    // 上传文件保存路径
    public readonly uploadDir: string;

    constructor(public opts: Options = {}) {
        this.encoding = opts.encoding || 'utf-8';
        this.formLimit = (opts.formLimit || 56) + 'kb'
        this.json = opts.json || true
        this.jsonLimit = (opts.jsonLimit || 1) + 'mb'
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
        const request = ctx.req
        let body: any = {}
        if (typeIs(request, 'json') === 'json') {
            body = await parse.json(request, { limit: this.jsonLimit, strict: this.strict })
        }

        if (typeIs(request, 'urlencoded') === 'urlencoded') {
            body = await parse.form(request, { limit: this.formLimit, strict: this.strict })
        }

        if (typeIs(request, 'text') === 'text') {
            body = await parse.text(request, { limit: this.textLimit, strict: this.strict })
        }

        return body
    }

    /**
     * parseBody
     * Parser file request data
     */
    public async parseFile(ctx: Context): Promise<{
        fields?: formidable.Fields,
        files?: formidable.Files
    }> {
        const request = ctx.req
        if (typeIs(request, 'multipart')) return;
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm()
            if (this.formidable) {
                const { uploadDir, keepExtensions, maxFieldsSize, maxFields, hash, multiples} = this.formidable
                if (uploadDir) form.uploadDir = uploadDir
                if (keepExtensions)  form.keepExtensions = keepExtensions
                if (maxFieldsSize) {
                    form.maxFieldsSize = maxFieldsSize
                    form.maxFileSize = maxFieldsSize
                }
                if (maxFields) form.maxFields = maxFields
                if (hash) form.hash = hash
                if (multiples) form.multiples = multiples
            } else {
                form.uploadDir = this.uploadDir
                form.multiples = true
            }

            form.encoding = this.encoding

            form.parse(request, (err, fields, files) => {
                if (err) reject(err)
                resolve({
                    fields,
                    files
                })
            })
        })
    }
}

interface Options {
    uploadDir?: string;
    jsonLimit?: number;              // JSON正文的字节限制 默认值1mb
    formLimit?: number;              // 表单主体数据的限制 默认值56kb
    textLimit?: number;              // 文本正文的字节限制 默认值56kb
    encoding?: 'utf-8' | string;     // 编码格式 默认 utf-8
    multipart?: boolean;             // 开启 multipart 默认true
    urlencoded?: boolean;            // 解析 urlencoded  默认true
    text?: boolean;                  // 解析text 默认true
    json?: boolean;                  // 解析json 默认true
    jsonStrict?: boolean;            // json只解析数组和对象 默认true
    formidable?: FormMidable;  // formidable 选项
    strict?: boolean;                // 开启严格模式 不解析GET HEAD DELETE请求 默认true
}

interface FormMidable {
    maxFields?: number;              // 限制查询字符串解析器将解码的字段数，默认值1000
    maxFieldsSize?: number;          // 默认情况2mb (2 * 1024 * 1024)
    uploadDir?: string;              // 设置用于放置文件上载的目录，默认值os.tmpDir()
    keepExtensions?: boolean;        // 写入的文件uploadDir将包含原始文件的扩展名，默认值false
    hash?: string | boolean;         // 如果你想要进入的文件计算校验和，此设置为'sha1'或'md5'默认false
    multiples?: boolean;             // 多个文件上传或否，默认true
}