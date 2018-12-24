"use strict";
/**
 * @class BodyParserService
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 * @copyright Ranyunlong 2018-09-23 19:07
 */
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const typeIs = require("type-is");
const parse = require("co-body");
const formidable = require("@easyboot/formidable");
const chalk_1 = require("chalk");
const HttpException_1 = require("../HttpException");
const mime_types_1 = require("mime-types");
const configurations_1 = require("../../configurations");
function showWarn() {
    if (process.env.NODE_ENV === 'development') {
        console.warn(chalk_1.default.yellowBright(`Warn: \nThe Application bodyparse mode is strict, GET|DELETE|HEAD|COPY|PURGE|UNLOCK request method cannot parse body.`));
        console.warn(chalk_1.default.yellowBright(`If you still want to parse, please set config strict: false.`));
        console.warn(chalk_1.default.yellowBright(`Read code: 'EasyBootServletConfiguration.ts' bodyparse option.`));
    }
}
class BodyParserService {
    constructor(opts = new configurations_1.BodyParseConfiguration()) {
        this.opts = opts;
        this.encoding = opts.encoding || 'utf-8';
        this.formLimit = (opts.formLimit || 56) + 'kb';
        this.json = opts.json || true;
        this.jsonLimit = (opts.jsonLimit || 56) + 'kb';
        this.textLimit = (opts.textLimit || 1) + 'mb';
        this.jsonStrict = opts.jsonStrict || true;
        this.multipart = opts.multipart || true;
        this.urlencoded = opts.urlencoded || true;
        this.strict = opts.strict || true;
        this.uploadDir = opts.uploadDir || os.tmpdir();
    }
    /**
     * parseBody
     * Parser body request data
     */
    async parseBody(ctx) {
        let body = {};
        if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(ctx.method) && this.strict) {
            showWarn();
            return body;
        }
        if (typeIs(ctx.req, 'json') === 'json') {
            body = await parse.json(ctx.req, { limit: this.jsonLimit, strict: this.strict });
        }
        if (typeIs(ctx.req, 'urlencoded') === 'urlencoded') {
            body = await parse.form(ctx.req, { limit: this.formLimit, strict: this.strict });
        }
        if (typeIs(ctx.req, 'text') === 'text') {
            body = await parse.text(ctx.req, { limit: this.textLimit, strict: this.strict });
        }
        return body;
    }
    /**
     * parseBody
     * Parser file request data
     */
    async parseFile(ctx, options) {
        if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(ctx.method) && this.strict) {
            showWarn();
            return;
        }
        ;
        if (!typeIs(ctx.req, 'multipart'))
            return;
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.uploadDir = this.uploadDir;
            form.multiples = true;
            form.encoding = this.encoding;
            form.maxFileSize = 2 * 1024 * 1024;
            const opts = { ...this.formidable, ...options };
            Object.keys(opts).forEach((key) => {
                form[key] = opts[key];
            });
            form.onPart = function (part) {
                if (part.mime) {
                    let fileType = opts.fileType;
                    if (Array.isArray(fileType)) {
                        if (!fileType.find((v) => mime_types_1.contentType(v) === mime_types_1.contentType(part.mime))) {
                            form.pause();
                            reject(new HttpException_1.HttpException({
                                statusCode: 400,
                                data: {
                                    msg: `The Request File key '${part.name}' type expected ${fileType.map((v) => `'${mime_types_1.contentType(v)}'`).join(' or ')}, got ${part.mime}`
                                }
                            }));
                            return;
                        }
                    }
                    else if (typeof fileType === 'string') {
                        if (mime_types_1.contentType(fileType) !== mime_types_1.contentType(part.mime)) {
                            form.pause();
                            reject(new HttpException_1.HttpException({
                                statusCode: 400,
                                data: {
                                    msg: `The Request File key '${part.name}' type expected ${mime_types_1.contentType(fileType)}, got ${part.mime}`
                                }
                            }));
                        }
                        return;
                    }
                }
                form.handlePart(part);
            };
            form.parse(ctx.req, (err, fields, files) => {
                if (err) {
                    if (/maxFileSize exceeded/.test(err.message)) {
                        reject(new HttpException_1.HttpException({
                            statusCode: 413,
                            data: {
                                msg: err.message
                            }
                        }));
                    }
                }
                resolve({
                    ...files,
                    ...fields
                });
            });
        });
    }
}
exports.BodyParserService = BodyParserService;
