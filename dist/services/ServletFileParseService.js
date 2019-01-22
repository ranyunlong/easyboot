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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldEZpbGVQYXJzZVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvU2VydmxldEZpbGVQYXJzZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILGtDQUFpQztBQUNqQyxtREFBa0Q7QUFDbEQsMkJBQTRCO0FBQzVCLDJDQUF3QztBQUN4QywyREFBd0Q7QUFHeEQseURBQXNEO0FBRXRELE1BQWEsdUJBQXdCLFNBQVEsK0JBQWM7SUFDdkQsWUFBbUIsT0FBZ0IsRUFBRTtRQUNqQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFERSxTQUFJLEdBQUosSUFBSSxDQUFjO0lBRXJDLENBQUM7SUFDTSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQXVDO1FBQ3pELE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVELENBQUM7SUFFTSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQXVCLEVBQUUsUUFBc0I7UUFDOUQsTUFBTSxFQUNGLFFBQVEsR0FBRyxPQUFPLEVBQ2xCLFNBQVMsR0FBRSxXQUFNLEVBQUUsRUFDbkIsY0FBYyxHQUFHLEtBQUssRUFDdEIsSUFBSSxHQUFHLFdBQVcsRUFDbEIsU0FBUyxHQUFHLElBQUksRUFDaEIsV0FBVyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxFQUM3QixhQUFhLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEVBQy9CLElBQUksR0FBRyxLQUFLLEVBQ1osU0FBUyxHQUFHLElBQUksRUFDaEIsYUFBYSxFQUNiLGFBQWEsRUFDaEIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ2IsSUFBSSxxQ0FBcUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUFFLE9BQU87UUFDdkUsSUFBSSxDQUFDLE1B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