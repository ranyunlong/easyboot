/**
 * @class ServletProxyService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import * as httpProxy from 'http-proxy'
import * as url from 'url';
import * as stream from 'stream';
import { Agent } from 'http';
import { ServerOptions } from 'https'
import chalk from 'chalk';
import * as parseUrl from 'parseurl'
import { ServletContext } from '../core/ServletContext';
import { ServletService } from '../core/ServletService';
import { ServiceMetadata } from 'src/core/ServiceMetadata';

const _proxy: httpProxy = httpProxy.createProxyServer({})

export class ServletProxyService extends ServletService {
    public _proxy: httpProxy = _proxy
    constructor(
        public options: ProxyTable
    ) {
        super('staic-serve')
    }
    public async onBeforeController(metadata: ServiceMetadata): Promise<void> {
        const { context } = metadata
        if (context.finished || context.headerSent || !context.writable) return;
        if (!Object.keys(this.options).length) return;
        await this.proxyTable(context)
    }

    public async proxyTable(context: ServletContext): Promise<void> {
        const { options } = this
        for (let key in options) {
            await this.proxy(key, context, options[key])
        }
    }

    public async proxy(path: string, context: ServletContext, proxyOptions: ProxyOptions) {
        return new Promise((next, reject) => {
            const { changeOrigin, pathRewrite, target } = proxyOptions
            if (!/^\//.test(path)) path = `/${path}`
            if (!/\^/.test(path)) path = `^${path}`
            if (RegExp(path).test(context.path)) {
                if (typeof changeOrigin === 'undefined') proxyOptions.changeOrigin = true
                const requestPath = context.path
                for (let item in pathRewrite) {
                    const originItem = item
                    if (!/\^/.test(item)) item = '^' + item
                    if (RegExp(item).test(requestPath)) {
                        const search = parseUrl(context.req).search
                        context.req.url = requestPath.replace(RegExp(item), pathRewrite[originItem]).replace(/[\/]{2,}/, '/') + (search ? search : '')
                    }
                }
                // proxy
                _proxy.web(context.req, context.res, proxyOptions)
                _proxy.on('error', function(err) {
                    reject(err)
                })
            } else {
                next()
            }
        })
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