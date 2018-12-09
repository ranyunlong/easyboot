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
import { Context } from './Context'
import { Response } from './Response'
import { Request } from './Request'
import { Stream } from 'stream'
import { isJSON } from './utils'
import { HttpException } from './HttpException';
import { MetadataElementTypes } from '../enums';
import { Router } from '../router';
import { EasyBootServletConfiguration } from '../EasyBootServletConfiguration';
import { EasyBootMetadataManager } from '../EasyBootMetadataManager';
import { BodyParserService } from './BodyParserService';

export abstract class EasyBootServlet extends EventEmitter {
    public proxy: boolean;
    public subdomainOffset: number = 2;
    public env: Env = process.env.NODE_ENV as Env || 'development';
    public silent: boolean;
    public keys: string[];
    public router: Router;
    public metadataManager = new EasyBootMetadataManager();
    public bodyParserService: BodyParserService;

    /**
     * constructor
     */
    constructor(public configs: EasyBootServletConfiguration = {}) {
        super()
        const metadata = MetadataElementTypes.Metadata
        const MetadataConfiguration = Reflect.getMetadata(metadata.CONFIGURATION, this.constructor)
        if (typeof MetadataConfiguration === 'function') {
            this.configs = Object.assign(this.configs, new MetadataConfiguration())
        } else {
            this.configs = Object.assign(new EasyBootServletConfiguration(), this.configs)
        }
        const { port, host, keys = ['easyboot:sess'], subdomainOffset = 2, env = 'development', router, bodyparse } = configs
        this.bodyParserService = new BodyParserService(bodyparse)
        this.keys = keys
        this.subdomainOffset = subdomainOffset
        this.env = env
        process.env.NODE_ENV = env
        if (Reflect.hasMetadata(metadata.EASYBOOTMODULE, this.constructor)) {
            const rootModule = Reflect.getMetadata(metadata.EASYBOOTMODULE, this.constructor)
            this.metadataManager.register(rootModule)
            this.router = new Router(this, {
                rootModule,
                ...router
            })
        }
        // Start server listen port
        if (port) this.listen(port, host)
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
                if (error.message.length > 0 && error.name !== 'TypeError') context.message = error.message
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

export type Env = 'development' | 'production'

export default EasyBootServlet