"use strict";
/**
 * @class ProxyService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const httpProxy = require("http-proxy");
const chalk_1 = require("chalk");
const parseUrl = require("parseurl");
const _proxy = httpProxy.createProxyServer({});
async function proxy(path, ctx, proxyOptions) {
    return new Promise((next, reject) => {
        const { changeOrigin, pathRewrite, target } = proxyOptions;
        if (!/^\//.test(path))
            path = `/${path}`;
        if (!/\^/.test(path))
            path = `^${path}`;
        if (RegExp(path).test(ctx.path)) {
            if (typeof changeOrigin === 'undefined')
                proxyOptions.changeOrigin = true;
            const requestPath = ctx.path;
            for (let item in pathRewrite) {
                const originItem = item;
                if (!/\^/.test(item))
                    item = '^' + item;
                if (RegExp(item).test(requestPath)) {
                    const search = parseUrl(ctx.req).search;
                    ctx.req.url = requestPath.replace(RegExp(item), pathRewrite[originItem]).replace(/[\/]{2,}/, '/') + (search ? search : '');
                }
            }
            // proxy
            _proxy.web(ctx.req, ctx.res, proxyOptions);
            _proxy.on('error', function (err) {
                reject(err);
            });
        }
        else {
            next();
        }
    });
}
async function proxyTable(ctx, options = {}) {
    for (let key in options) {
        await proxy(key, ctx, options[key]);
    }
}
class ProxyService {
    constructor(options) {
        this.options = options;
        this._proxy = _proxy;
        if (process.env.NODE_ENV === 'development' && typeof options === 'object' && !Array.isArray(options)) {
            Object.keys(options).forEach((k) => {
                console.log(`${chalk_1.default.greenBright('┌──Server proxy───────────────────────────')}`);
                const data = JSON.stringify(options, null, 2);
                console.log(data.split('\n').map((v) => {
                    const split = v.split(':');
                    let [key, ...value] = split;
                    if (key && value.length > 0) {
                        const values = value.join(':');
                        const replaceValue = values.replace(/(\"|\[|\]|\{|\}|,|\s)/g, '');
                        return `  ` + [key, values.replace(replaceValue, chalk_1.default.greenBright(replaceValue))].join(':');
                    }
                    return `  ` + v;
                }).join('\n'));
                console.log(`${chalk_1.default.greenBright('└──────────────────────────────────────────')}`);
            });
        }
    }
    async handleResponse(ctx) {
        if (ctx.finished || ctx.headerSent || !ctx.writable)
            return;
        if (!Object.keys(this.options).length)
            return;
        await proxyTable(ctx, this.options);
    }
}
exports.ProxyService = ProxyService;
