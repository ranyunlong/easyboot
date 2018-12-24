"use strict";
/**
 * @class Core
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const EventEmitter = require("events");
const statuses = require("statuses");
const https = require("https");
const http_1 = require("http");
const Context_1 = require("./Context");
const Response_1 = require("./Response");
const Request_1 = require("./Request");
const stream_1 = require("stream");
const utils_1 = require("./utils");
const HttpException_1 = require("./HttpException");
const enums_1 = require("../enums");
const router_1 = require("../router");
const configurations_1 = require("../configurations");
const MetadataManager_1 = require("../MetadataManager");
const BodyParserService_1 = require("./services/BodyParserService");
const SessionService_1 = require("./services/SessionService");
const StaticService_1 = require("./services/StaticService");
const ProxyService_1 = require("./services/ProxyService");
class EasyBootServlet extends EventEmitter {
    /**
     * constructor
     */
    constructor(configs = new configurations_1.ServletConfiguration()) {
        super();
        this.configs = configs;
        this.subdomainOffset = 2;
        this.env = process.env.NODE_ENV || 'development';
        const metadata = enums_1.MetadataEnums.Base;
        const MetadataConfiguration = Reflect.getMetadata(metadata.CONFIGURATION, this.constructor);
        if (typeof MetadataConfiguration === 'function') {
            this.configs = Object.assign(this.configs, new MetadataConfiguration());
        }
        const { port, host, keys = ['easyboot:sess'], subdomainOffset = 2, env = 'development', router, bodyConfig, sessionConfig, staticConfig, proxyTable } = configs;
        this.keys = keys;
        this.subdomainOffset = subdomainOffset;
        this.env = env;
        process.env.NODE_ENV = env;
        this.bodyParserService = new BodyParserService_1.BodyParserService(bodyConfig);
        this.sessionService = new SessionService_1.SessionService(this, sessionConfig);
        if (staticConfig)
            this.staticService = new StaticService_1.StaticService(staticConfig);
        if (proxyTable)
            this.proxyService = new ProxyService_1.ProxyService(proxyTable);
        if (Reflect.hasMetadata(metadata.EASYBOOTMODULE, this.constructor)) {
            const rootModule = Reflect.getMetadata(metadata.EASYBOOTMODULE, this.constructor);
            this.router = new router_1.Router(this, router);
            this.metadataManager = new MetadataManager_1.MetadataManager(this, rootModule);
        }
        // Start server listen port
        if (port)
            this.listen(port, host);
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
        const [port, host = 'localhost'] = args;
        const { ssl } = this.configs;
        // ssl
        if (ssl) {
            https.createServer(ssl, this.callback())
                .listen(port, host);
        }
        else {
            http_1.createServer(this.callback())
                .listen(port, host);
        }
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
            // Get session
            await this.sessionService.get(context);
            // handler custom hooks
            if (typeof this.run === 'function')
                await this.run(context);
            // handler proxy service
            if (this.proxyService)
                await this.proxyService.handleResponse(context);
            // handler static service
            if (this.staticService)
                await this.staticService.handleResponse(context);
            // handler controller
            await this.router.handleResponse(context);
            // handler static service defer
            if (this.staticService)
                await this.staticService.handleResponseDefer(context);
            // Set session
            await this.sessionService.set(context);
            // response
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
            return;
        }
        else {
            if (this.env === 'development' && error.name !== 'HttpException') {
                console.error(error.stack);
            }
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
                if (error.message.length > 0 && error.name !== 'TypeError')
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
exports.EasyBootServlet = EasyBootServlet;
exports.default = EasyBootServlet;
