/**
 * @class Servlet
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import * as https from 'https'
import * as Keygrip from 'keygrip'
import * as statuses from 'statuses'
import * as EventEmitter from 'events'
import { Stream } from 'stream'
import { isJSON } from './utils'
import { ListenOptions } from 'net'
import { ServletContext } from './ServletContext'
import { ServletRequest } from './ServletRequest'
import { ServletResponse } from './ServletResponse'
import { IncomingMessage, ServerResponse, createServer } from 'http'
import { ServletConfiguration } from '../configurations/ServletConfiguration'
import { HttpException } from './HttpException';
import { BASE } from '../constants/metadata.constant';
import { Ctor, Env } from '../types/index.api';
import { Router } from '../router/Router';

export class Servlet extends EventEmitter {
    public proxy: boolean;
    public subdomainOffset: number;
    public env: Env;
    public keys: string[] | Keygrip;
    public silent: boolean;

    public router: Router;

    constructor(private options?: ServletConfiguration) {
        super()
        const Configuration = Reflect.getMetadata(BASE.CONFIGURATION, this.constructor)

        if (Configuration) {
            this.options = new Configuration()
        }

        if (!this.options) this.options = {}

        // Create router
        this.router = new Router(this, this.options.router)

        // Server listener
        if (this.options.port) {
            const { port, host } = this.options
            if (port) this.listen(port, host)
        }

        if (typeof this.bootstrap === 'function') {
            this.bootstrap()
        }
    }

    public bootstrap?(): void;

    /**
     * start reponse
     */
    private async start(request: IncomingMessage, response: ServerResponse) {
        const context = this.createContext(request, response)
        try {
            const stack = await this.router.matchRoutes(context)
            for (let layer of stack) {
               const data = layer.handler()
                if (data) {
                    context.body = data
                    break;
                }
            }
            await this.respond(context)
            if (!context.body) context.throw(404)

        } catch (error) {
            // Handler exception
            if (!(error instanceof HttpException) && statuses[error.message]) {
                return this.exception(context, new HttpException(error))
            }
            return this.exception(context, error)
        }
    }

    /**
     * respond
     * Application respond
     */
    private async respond(context: ServletContext): Promise<any> {
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
     * createContext
     * Server context create method
     */
    private createContext(req: IncomingMessage, res: ServerResponse): ServletContext {
        const request = new ServletRequest(req, res, this)
        const response = new ServletResponse(req, res, this)
        const context = new ServletContext(req, res, request, response, this)
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        return context;
    }

    /**
     * exception
     * Exception handler method
     */
    private exception(context: ServletContext, error: HttpException) {
        if (this.listeners('error').length > 0) this.emit('error', error)
        if (this.listeners('exception').length > 0) {
            return this.emit('exception', error)
        } else {
            if (this.env === 'development' && error.name !== 'HttpException' && !this.silent) {
                console.error(error.stack)
            }
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
     * listen
     * Http listen method
     */
    public listen(port?: number, hostname?: string, backlog?: number, listeningListener?: Function): this;
    public listen(port?: number, hostname?: string, listeningListener?: Function): this;
    public listen(port?: number, backlog?: number, listeningListener?: Function): this;
    public listen(port?: number, listeningListener?: Function): this;
    public listen(path: string, backlog?: number, listeningListener?: Function): this;
    public listen(path: string, listeningListener?: Function): this;
    public listen(options: ListenOptions, listeningListener?: Function): this;
    public listen(handle: any, backlog?: number, listeningListener?: Function): this;
    public listen(handle: any, listeningListener?: Function): this;
    public listen(...args: any[]): this {
        const { ssl } = this.options
        // ssl
        if (ssl) {
            https.createServer(ssl, (request, response) => this.start(request, response))
            .listen(...args)
        } else {
            createServer((request, response) => this.start(request, response))
            .listen(...args)
        }
        return this;
    }

}