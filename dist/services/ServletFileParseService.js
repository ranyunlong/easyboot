"use strict";
/**
 * @class ServletFileParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const typeIs = require("type-is");
const formidable = require("@easyboot/formidable");
const os_1 = require("os");
const mime_types_1 = require("mime-types");
const ServletService_1 = require("../core/ServletService");
const HttpException_1 = require("../core/HttpException");
class ServletFileParseService extends ServletService_1.ServletService {
    constructor(opts = {}) {
        super('file');
        this.opts = opts;
    }
    async onLaunch(metadata) {
        return await this.parse(metadata.context, metadata.data);
    }
    async parse(context, metadata) {
        const { encoding = 'utf-8', uploadDir = os_1.tmpdir(), keepExtensions = false, type = 'multipart', maxFields = 1000, maxFileSize = 2 * 1024 * 1024, maxFieldsSize = 2 * 1024 * 1024, hash = false, multiples = true, bytesReceived, bytesExpected } = this.opts;
        if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(context.method))
            return;
        if (!typeIs(context.req, 'multipart'))
            return;
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
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
            };
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
            form.parse(context.req, (err, fields, files) => {
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
exports.ServletFileParseService = ServletFileParseService;
//# sourceMappingURL=ServletFileParseService.js.map