"use strict";
/**
 * @class ServletProxyService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const httpProxy = require("http-proxy");
const parseUrl = require("parseurl");
const ServletService_1 = require("../core/ServletService");
const _proxy = httpProxy.createProxyServer({});
class ServletProxyService extends ServletService_1.ServletService {
    constructor(options) {
        super('staic-serve');
        this.options = options;
        this._proxy = _proxy;
    }
    async onBeforeController(metadata) {
        const { context } = metadata;
        if (context.finished || context.headerSent || !context.writable)
            return;
        if (!Object.keys(this.options).length)
            return;
        await this.proxyTable(context);
    }
    async proxyTable(context) {
        const { options } = this;
        for (let key in options) {
            await this.proxy(key, context, options[key]);
        }
    }
    async proxy(path, context, proxyOptions) {
        return new Promise((next, reject) => {
            const { changeOrigin, pathRewrite, target } = proxyOptions;
            if (!/^\//.test(path))
                path = `/${path}`;
            if (!/\^/.test(path))
                path = `^${path}`;
            if (RegExp(path).test(context.path)) {
                if (typeof changeOrigin === 'undefined')
                    proxyOptions.changeOrigin = true;
                const requestPath = context.path;
                for (let item in pathRewrite) {
                    const originItem = item;
                    if (!/\^/.test(item))
                        item = '^' + item;
                    if (RegExp(item).test(requestPath)) {
                        const search = parseUrl(context.req).search;
                        context.req.url = requestPath.replace(RegExp(item), pathRewrite[originItem]).replace(/[\/]{2,}/, '/') + (search ? search : '');
                    }
                }
                // proxy
                _proxy.web(context.req, context.res, proxyOptions);
                _proxy.on('error', function (err) {
                    reject(err);
                });
            }
            else {
                next();
            }
        });
    }
}
exports.ServletProxyService = ServletProxyService;
//# sourceMappingURL=ServletProxyService.js.map