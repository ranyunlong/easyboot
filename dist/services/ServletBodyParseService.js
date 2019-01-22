"use strict";
/**
 * @class ServletBodyParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ServletService_1 = require("../core/ServletService");
const parse = require("co-body");
const typeIs = require("type-is");
class ServletBodyParseService extends ServletService_1.ServletService {
    constructor(strict = true, limit = {
        json: '1mb',
        form: '56kb',
        text: '56kb'
    }, opts = {}) {
        super('body');
        this.strict = strict;
        this.limit = limit;
        this.opts = opts;
    }
    async onLaunch(metadata) {
        return await this.parse(metadata.context);
    }
    async parse(context) {
        const { isParseJson = true, isParseText = true, isParseUrlencoded = true } = this.opts;
        let body = {};
        if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(context.method))
            return null;
        if (isParseJson && typeIs(context.req, 'json') === 'json') {
            body = await parse.json(context.req, {
                limit: this.limit.json,
                strict: this.strict
            });
        }
        if (isParseText && typeIs(context.req, 'urlencoded') === 'urlencoded') {
            body = await parse.form(context.req, {
                limit: this.limit.form,
                strict: this.strict
            });
        }
        if (isParseUrlencoded && typeIs(context.req, 'text') === 'text') {
            body = await parse.text(context.req, {
                limit: this.limit.text,
                strict: this.strict
            });
        }
        return body;
    }
}
exports.ServletBodyParseService = ServletBodyParseService;
//# sourceMappingURL=ServletBodyParseService.js.map