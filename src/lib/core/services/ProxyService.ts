/**
 * @class ProxyService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import * as httpProxy from 'http-proxy'
import * as url from 'url';
import * as stream from 'stream';
import { Agent } from 'http';
import { ServerOptions } from 'https'
import { Context } from '../Context';
import chalk from 'chalk';
import * as parseUrl from 'parseurl'

const _proxy: httpProxy = httpProxy.createProxyServer({})

async function proxy(path: string, ctx: Context, proxyOptions: ProxyOptions) {
    return new Promise((next, reject) => {
        const { changeOrigin, pathRewrite, target } = proxyOptions
        if (!/^\//.test(path)) path = `/${path}`
        if (!/\^/.test(path)) path = `^${path}`
        if (RegExp(path).test(ctx.path)) {
            if (typeof changeOrigin === 'undefined') proxyOptions.changeOrigin = true
            const requestPath = ctx.path
            for (let item in pathRewrite) {
                const originItem = item
                if (!/\^/.test(item)) item = '^' + item
                if (RegExp(item).test(requestPath)) {
                    const search = parseUrl(ctx.req).search
                    ctx.req.url = requestPath.replace(RegExp(item), pathRewrite[originItem]).replace(/[\/]{2,}/, '/') + (search ? search : '')
                }
            }
            // proxy
            _proxy.web(ctx.req, ctx.res, proxyOptions)
            _proxy.on('error', function(err) {
                reject(err)
            })
        } else {
            next()
        }
    })
}

async function proxyTable(ctx: Context, options: ProxyTable = {}) {
    for (let key in options) {
        await proxy(key, ctx, options[key])
    }
}

export class ProxyService {
    public _proxy: httpProxy = _proxy
    constructor(public options: ProxyTable) {
        if (process.env.NODE_ENV === 'development' && typeof options === 'object' && !Array.isArray(options)) {
            Object.keys(options).forEach((k) => {
                console.log(`${chalk.greenBright('┌──Server proxy───────────────────────────')}`)
                const data = JSON.stringify(options, null, 2)
                console.log(data.split('\n').map((v) => {
                    const split = v.split(':')
                    let [ key, ...value ] = split
                    if (key && value.length > 0) {
                        const values = value.join(':')
                        const replaceValue = values.replace(/(\"|\[|\]|\{|\}|,|\s)/g, '')
                        return `  ` + [ key, values.replace(replaceValue, chalk.greenBright(replaceValue)) ].join(':')
                    }
                    return `  ` + v
                }).join('\n'))
                console.log(`${chalk.greenBright('└──────────────────────────────────────────')}`)
            })
        }
    }
    public async handleResponse(ctx: Context) {
        if (ctx.finished || ctx.headerSent || !ctx.writable) return;
        if (!Object.keys(this.options).length) return;
        await proxyTable(ctx, this.options)
    }
}

export interface PathRewrite {
    [key: string]: string;
}

export interface ProxyOptions {
    /** Buffer */
    buffer?: stream.Stream;
    /** URL string to be parsed with the url module. */
    target: string | url.Url;
    /** URL string to be parsed with the url module. */
    forward?: string| url.Url;
    /** Object to be passed to http(s).request. */
    agent?: Agent;
    /** Object to be passed to https.createServer(). */
    ssl?: ServerOptions;
    /** If you want to proxy websockets. */
    ws?: boolean;
    /** Adds x- forward headers. */
    xfwd?: boolean;
    /** Verify SSL certificate. */
    secure?: boolean;
    /** Explicitly specify if we are proxying to another proxy. */
    toProxy?: boolean;
    /** Specify whether you want to prepend the target's path to the proxy path. */
    prependPath?: boolean;
    /** Specify whether you want to ignore the proxy path of the incoming request. */
    ignorePath?: boolean;
    /** Local interface string to bind for outgoing connections. */
    localAddress?: boolean;
    /** Changes the origin of the host header to the target URL. */
    changeOrigin?: boolean;
    /** specify whether you want to keep letter case of response header key */
    preserveHeaderKeyCase?: boolean;
    /** Basic authentication i.e. 'user:password' to compute an Authorization header. */
    auth?: string;
    /** Rewrites the location hostname on (301 / 302 / 307 / 308) redirects, Default: null. */
    hostRewrite?: string;
    /** Rewrites the location host/ port on (301 / 302 / 307 / 308) redirects based on requested host/ port.Default: false. */
    autoRewrite?: boolean;
    /** Rewrites the location protocol on (301 / 302 / 307 / 308) redirects to 'http' or 'https'.Default: null. */
    protocolRewrite?: string;
    /** rewrites domain of set-cookie headers. */
    cookieDomainRewrite?: false | string | {[oldDomain: string]: string};
    /** object with extra headers to be added to target requests. */
    headers?: {[header: string]: string};
    /** Timeout (in milliseconds) when proxy receives no response from target. Default: 120000 (2 minutes) */
    proxyTimeout?: number;
    /** If set to true, none of the webOutgoing passes are called and it's your responsibility to appropriately return the response by listening and acting on the proxyRes event */
    selfHandleResponse?: boolean;
    pathRewrite: PathRewrite;
}

export interface ProxyTable {
    [key: string]: ProxyOptions
}