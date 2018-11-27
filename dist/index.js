"use strict";
/**
 * @class Core
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const statuses = require("statuses");
const http_1 = require("http");
const Context_1 = require("./lib/Context");
const Response_1 = require("./lib/Response");
const Request_1 = require("./lib/Request");
const stream_1 = require("stream");
const utils_1 = require("./lib/utils");
const HttpException_1 = require("./lib/HttpException");
class Core extends EventEmitter {
    /**
     * constructor
     */
    constructor(options = {}) {
        super();
        this.options = options;
        this.subdomainOffset = 2;
        this.env = process.env.NODE_ENV || 'development';
        const { port = 3000, host = 'localhost', keys = ['esboot:sess'], subdomainOffset = 2, env = 'development' } = options;
        this.keys = keys;
        this.subdomainOffset = subdomainOffset;
        this.env = env || process.env.NODE_ENV;
        process.env.NODE_ENV = env;
        // Start server listen port
        if (port) {
            if (host) {
                this.listen(port, host);
            }
            else {
                this.listen(port);
            }
        }
    }
    /**
     * callback
     * Handler custom http proccess
     */
    callback() {
        return (request, response) => {
            this.start(request, response);
        };
    }
    listen(...args) {
        http_1.createServer(this.callback())
            .listen(...args);
        return this;
    }
    /**
     * start
     * Application start method
     */
    async start(request, response) {
        // Create http/https context
        const context = this.createContext(request, response);
        try {
            if (typeof this.response === 'function')
                await this.response(context);
            await this.respond(context);
            /**
             * Handler not found
             * 1. Response is not finished
             * 2. Response is not headerSent
             * 3. Response is writable
             * 4. response body == null
             */
            if (!context.finished &&
                !context.headerSent &&
                context.writable &&
                context.response.body == null)
                context.throw(404);
        }
        catch (error) {
            // Handler exception
            if (!(error instanceof HttpException_1.HttpException) && statuses[error.message]) {
                error = new HttpException_1.HttpException(error);
            }
            this.exception(context, error);
            this.emit('exception', [error, context]);
        }
    }
    /**
     * respond
     * Application respond
     */
    async respond(context) {
        // Check context writable
        if (!context.writable)
            return;
        // Get response body
        let body = context.response.body;
        // check response statusCode
        const code = context.status;
        const response = context.res;
        // ignore body
        if (statuses.empty[code]) {
            // strip headers
            context.body = null;
            return response.end();
        }
        // If request method is HEAD
        if ('HEAD' === context.method) {
            if (!response.headersSent && utils_1.isJSON(body)) {
                context.length = Buffer.byteLength(JSON.stringify(body));
            }
            return response.end();
        }
        // responses
        if (body) {
            if (Buffer.isBuffer(body))
                return response.end(body);
            if (typeof body === 'string')
                return response.end(body);
            if (body instanceof stream_1.Stream)
                return body.pipe(response);
            if (typeof body === 'object') {
                // body: json
                body = JSON.stringify(body);
                if (!response.headersSent) {
                    context.length = Buffer.byteLength(body);
                }
                return response.end(body);
            }
            if (typeof body === 'number') {
                body = body.toString();
                context.type = 'text';
                context.length = Buffer.byteLength(body);
                return response.end(body);
            }
        }
    }
    /**
     * exception
     * Exception handler method
     */
    exception(context, error) {
        if (this.listeners('err').length > 0) {
            this.emit('err', error);
        }
        else {
            if (this.env === 'development')
                console.error(error.stack);
        }
        let status;
        // If not number
        if (error.statusCode) {
            status = error.statusCode;
        }
        else if (isNaN(error.message)) {
            status = statuses[error.message];
        }
        if (!context.finished) {
            status = status || 500;
            const data = error.data || statuses[status];
            context.status = status;
            const reg = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
            if (error.message && !reg.test(error.message)) {
                if (error.message.length > 0)
                    context.message = error.message;
            }
            context.body = data;
            this.respond(context);
        }
    }
    /**
     * createContext
     * Server context create method
     */
    createContext(req, res) {
        const request = new Request_1.Request(req, res, this);
        const response = new Response_1.Response(req, res, this);
        const context = new Context_1.Context(req, res, request, response, this);
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        return context;
    }
}
exports.Core = Core;
__export(require("./lib/HttpException"));
__export(require("./lib/Context"));
__export(require("./lib/Request"));
__export(require("./lib/Response"));
exports.default = Core;
