"use strict";
/**
 * @class ServletStaticService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const send_1 = require("../utils/send");
const ServletService_1 = require("../core/ServletService");
class ServletStaticService extends ServletService_1.ServletService {
    constructor(options) {
        super('staic-serve');
        this.options = options;
    }
    async onBeforeController(metadata) {
        if (this.options.defer)
            return;
        const { context } = metadata;
        if (context.finished || context.headerSent || !context.writable || context.response.body)
            return;
        if (context.method === 'HEAD' || context.method === 'GET') {
            try {
                await send_1.default(context, context.path, this.options);
            }
            catch (err) {
                if (err.status !== 404) {
                    throw err;
                }
            }
        }
    }
    async onAfterController(metadata) {
        if (!this.options.defer)
            return;
        const { context } = metadata;
        if (context.finished || context.headerSent || !context.writable || context.response.body)
            return;
        if (context.method !== 'HEAD' && context.method !== 'GET')
            return;
        // response is already handled
        if (context.response.body != null || context.status === 404)
            return;
        try {
            await send_1.default(context, context.path, this.options);
        }
        catch (err) {
            if (err.status !== 404) {
                throw err;
            }
        }
    }
}
exports.ServletStaticService = ServletStaticService;
//# sourceMappingURL=ServletStaticService.js.map