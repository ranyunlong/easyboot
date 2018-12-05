/**
 * @class Core
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import * as EventEmitter from 'events'
import * as statuses from 'statuses'
import * as https from 'https'
import { ListenOptions } from 'net'
import { IncomingMessage, ServerResponse, createServer } from 'http'
import { ServerOptions } from 'https'
import { Context } from './lib/Context'
import { Response } from './lib/Response'
import { Request } from './lib/Request'
import { Stream } from 'stream'
import { isJSON } from './lib/utils'
import { HttpException } from './lib/HttpException';
import { Router } from './lib/Router';
import { ModuleInterface, TClass } from './lib/Module';
import * as pathToRegexp from 'path-to-regexp';
import { BodyParserService } from './lib/BodyParserService';

export abstract class EasyBootServlet extends EventEmitter {
    public proxy: boolean;
    public subdomainOffset: number = 2
    public env: Env = process.env.NODE_ENV as Env || 'development'
    public silent: boolean
    public keys: string[];
    public router: Router;
    public modules: Array<TClass<any, ModuleInterface>>;
    public configs: Options;
    public bodyParseService: BodyParserService;

    /**
     * constructor
     */
    constructor(configs: Options = {}) {
        super()
        this.configs = {...this.configs, ...configs}
        const { port, host, keys = ['easyboot:sess'], subdomainOffset = 2, env = 'development', router = {} } = this.configs
        this.keys = keys
        this.subdomainOffset = subdomainOffset
        this.env = env
        process.env.NODE_ENV = env
        // Start server listen port
        if (port) this.listen(port, host)
        const { modules } = this
        const bodyService = this.bodyParseService = new BodyParserService()
        this.router = new Router({
            modules,
            ...router,
            bodyService
        })
    }

    /**
     * callback
     * Handler custom http proccess
     */
    public callback() {
        return (request: IncomingMessage, response: ServerResponse) => {
            this.start(request, response)
        }
    }

    /**
     * listen
     * Http listen method
     */
    public listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): this;
    public listen(port: number, hostname?: string, listeningListener?: () => void): this;
    public listen(port: number, backlog?: number, listeningListener?: () => void): this;
    public listen(port: number, listeningListener?: () => void): this;
    public listen(path: string, backlog?: number, listeningListener?: () => void): this;
    public listen(path: string, listeningListener?: () => void): this;
    public listen(options: ListenOptions, listeningListener?: () => void): this;
    public listen(handle: any, backlog?: number, listeningListener?: () => void): this;
    public listen(handle: any, listeningListener?: () => void): this;
    public listen(...args: any[]): this {
        const [ port, host = 'localhost' ] = args
        const { ssl } = this.configs
        // ssl
        if (ssl) {
            https.createServer(ssl, this.callback())
            .listen(port, host)
        } else {
            createServer(this.callback())
            .listen(port, host)
        }
        return this;
    }

    public abstract async response(context: Context): Promise<void>;

    /**
     * start
     * Application start method
     */
    private async start(
        request: IncomingMessage,
        response: ServerResponse
    ): Promise<any>  {
        // Create http/https context
        const context = this.createContext(request, response)
        try {
            if (typeof this.response === 'function') await this.response(context)
            await this.router.handleResponse(context)
            await this.respond(context)
            /**
             * Handler not found
             * 1. Response is not finished
             * 2. Response is not headerSent
             * 3. Response is writable
             * 4. response body == null
             */
            if (
                !context.finished &&
                !context.headerSent &&
                context.writable &&
                context.response.body == null
            ) context.throw(404)

        } catch (error) {
            // Handler exception
            if (!(error instanceof HttpException) && statuses[error.message]) {
                error = new HttpException(error)
            }
            this.exception(context, error)
            this.emit('exception', [error, context])
        }
    }

    /**
     * respond
     * Application respond
     */
    private async respond(context: Context): Promise<any> {
        // Check context writable
        if (!context.writable) return;

        // Get response body
        let body: any = context.response.body;

        // check response statusCode
        const code = context.status;

        const response = context.res as ServerResponse

        // ignore body
        if (statuses.empty[code]) {
            // strip headers
            context.body = null;
            return response.end();
        }

        // If request method is HEAD
        if ('HEAD' === context.method) {
            if (!response.headersSent && isJSON(body)) {
                context.length = Buffer.byteLength(JSON.stringify(body));
            }
            return response.end();
        }

        // responses
        if (body) {
            if (Buffer.isBuffer(body)) return response.end(body)

            if (typeof body === 'string') return response.end(body)

            if (body instanceof Stream) return body.pipe(response)

            if (typeof body === 'object') {
                // body: json
                body = JSON.stringify(body);
                if (!response.headersSent) {
                    context.length = Buffer.byteLength(body);
                }
                return response.end(body);
            }

            if (typeof body === 'number') {
                body = body.toString()
                context.type = 'text';
                context.length = Buffer.byteLength(body)
                return response.end(body)
            }
        }
    }

    /**
     * exception
     * Exception handler method
     */
    private exception(context: Context, error: HttpException) {
        if (this.listeners('err').length > 0) {
            this.emit('err', error)
        } else {
            if (this.env === 'development') console.error(error.stack)
        }
        let status: number;
        // If not number
        if (error.statusCode) {
            status = error.statusCode
        } else if (isNaN(error.message as any)) {
            status = statuses[error.message]
        }

        if (!context.finished) {
            status = status || 500
            const data = error.data || statuses[status]
            context.status = status
            const reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
            if (error.message && !reg.test(error.message)) {
                if (error.message.length > 0) context.message = error.message
            }
            context.body = data
            this.respond(context)
        }
    }

    /**
     * createContext
     * Server context create method
     */
    protected createContext(
        req: IncomingMessage,
        res: ServerResponse,
    ): Context {
        const request = new Request(req, res, this)
        const response = new Response(req, res, this)
        const context = new Context(req, res, request, response, this)
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        return context;
    }
}

export * from './lib/HttpException'
export * from './lib/Context'
export * from './lib/Request'
export * from './lib/Response'
export * from './lib/Module'
export * from './lib/Router'
export * from './lib/EasyBootServletConfiguration'
export * from './lib/Configuration'
export * from './lib/Controller'
export * from './lib/EasyBootEntity'
export * from './lib/EasyBootRequestArguments'
export * from './lib/EasyBootValidators'
export interface Options {
    port?: number;
    host?: string;
    keys?: string[];
    ssl?: ServerOptions;
    env?: Env;
    proxy?: boolean;
    subdomainOffset?: number;
    silent?: boolean;
    router?: pathToRegexp.RegExpOptions;
}
export type Env = 'development' | 'production'

export default EasyBootServlet