"use strict";
/**
 * @class StaticService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const send_1 = require("../../utils/send");
const assert = require("assert");
class StaticService {
    constructor(options) {
        this.options = options;
        const { root } = options;
        assert(root, 'root directory is required to serve files');
        if (options.index !== false)
            this.options.index = options.index || 'index.html';
    }
    async handleResponse(ctx) {
        if (this.options.defer)
            return;
        if (ctx.finished || ctx.headerSent || !ctx.writable)
            return;
        if (ctx.method === 'HEAD' || ctx.method === 'GET') {
            try {
                await send_1.default(ctx, ctx.path, this.options);
            }
            catch (err) {
                if (err.status !== 404) {
                    throw err;
                }
            }
        }
    }
    async handleResponseDefer(ctx) {
        if (!this.options.defer)
            return;
        if (ctx.finished || ctx.headerSent || !ctx.writable)
            return;
        if (ctx.method !== 'HEAD' && ctx.method !== 'GET')
            return;
        // response is already handled
        if (ctx.response.body != null || ctx.status === 404)
            return;
        try {
            await send_1.default(ctx, ctx.path, this.options);
        }
        catch (err) {
            if (err.status !== 404) {
                throw err;
            }
        }
    }
}
exports.StaticService = StaticService;
