/**
 * @class StaticService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import send from '../utils/send'
import * as assert from 'assert'
import { StaticConfiguration } from '../configurations/StaticConfiguration';
import { ServletContext } from 'src/core/ServletContext';

export class StaticService {
    constructor(public options: StaticConfiguration) {
        const { root } = options
        assert(root, 'root directory is required to serve files')
        if (options.index !== false) this.options.index = options.index || 'index.html'
    }
    public async handleResponse(ctx: ServletContext) {
        if (this.options.defer) return;
        if (ctx.finished || ctx.headerSent || !ctx.writable) return;
        if (ctx.method === 'HEAD' || ctx.method === 'GET') {
            try {
                await send(ctx, ctx.path, this.options)
            } catch (err) {
                if (err.status !== 404) {
                    throw err
                }
            }
        }
    }
    public async handleResponseDefer(ctx: ServletContext) {
        if (!this.options.defer) return;
        if (ctx.finished || ctx.headerSent || !ctx.writable) return;
        if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return;
        // response is already handled
        if (ctx.response.body != null || ctx.status === 404) return;
        try {
            await send(ctx, ctx.path, this.options)
        } catch (err) {
            if (err.status !== 404) {
              throw err
            }
        }
    }
}