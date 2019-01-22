"use strict";
/**
 * @class Servlet
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const statuses = require("statuses");
const EventEmitter = require("events");
const stream_1 = require("stream");
const utils_1 = require("./utils");
const ServletContext_1 = require("./ServletContext");
const ServletRequest_1 = require("./ServletRequest");
const ServletResponse_1 = require("./ServletResponse");
const http_1 = require("http");
const HttpException_1 = require("./HttpException");
const metadata_constant_1 = require("../constants/metadata.constant");
const Router_1 = require("../router/Router");
const ServletBodyParseService_1 = require("../services/ServletBodyParseService");
const ServletSessionService_1 = require("../services/ServletSessionService");
const ServletQueryParseService_1 = require("../services/ServletQueryParseService");
const ServletParamParseService_1 = require("../services/ServletParamParseService");
const ServletFileParseService_1 = require("../services/ServletFileParseService");
const ServletStaticService_1 = require("../services/ServletStaticService");
const path_1 = require("path");
const ServiceMetadata_1 = require("./ServiceMetadata");
class Servlet extends EventEmitter {
    constructor(options) {
        super();
        this.options = options;
        const Configuration = Reflect.getMetadata(metadata_constant_1.BASE.CONFIGURATION, this.constructor);
        if (Configuration) {
            this.options = new Configuration();
        }
        if (!this.options)
            this.options = {};
        this.keys = this.options.keys || ['easyboot', 'servlet'];
        this.setMaxListeners(this.options.maxListeners || 100000);
        // Create router
        this.router = new Router_1.Router(this, this.options.router);
        // Server listener
        if (this.options.port) {
            const { port, host } = this.options;
            if (port)
                this.listen(port, host);
        }
        this.registerProvider(new ServletBodyParseService_1.ServletBodyParseService());
        this.registerProvider(new ServletFileParseService_1.ServletFileParseService());
        this.registerProvider(new ServletSessionService_1.ServletSessionService({
            signed: true
        }));
        this.registerProvider(new ServletQueryParseService_1.ServletQueryParseService('query'));
        this.registerProvider(new ServletParamParseService_1.ServletParamParseService('param'));
        this.registerProvider(new ServletStaticService_1.ServletStaticService({
            root: this.options.staticDir || path_1.resolve('static'),
            index: 'index.html'
        }));
        if (typeof this.bootstrap === 'function') {
            this.bootstrap();
        }
    }
    /**
     * start reponse
     */
    async start(request, response) {
        const context = this.createContext(request, response);
        try {
            const stack = await this.router.matchRoutes(context);
            const services = [];
            this.providers.forEach((service) => services.push(service));
            // Mapping service before controller
            for (let service of services) {
                if (typeof service.onBeforeController === 'function') {
                    await service.onBeforeController(new ServiceMetadata_1.ServiceMetadata(null, context));
                }
            }
            // Mapping controller layers
            for (let layer of stack) {
                const exceptionHandler = (error) => {
                    if (layer.exception) {
                        this.exception(context, layer.exception);
                    }
                    else if (layer.exceptionCapture) {
                        this.exception(context, new layer.exceptionCapture(error));
                    }
                    else {
                        this.exception(context, error);
                    }
                };
                this.once('exception', exceptionHandler);
                await layer.inject(context);
                const data = await layer.handler(...layer.handlerInjects);
                if (data) {
                    context.body = data;
                    if (layer.contentType)
                        context.type = layer.contentType;
                    if (layer.statusCode)
                        context.status = layer.statusCode;
                    if (layer.statusMessage)
                        context.response.message = layer.statusMessage;
                    break;
                }
                this.off('exception', exceptionHandler);
            }
            // Mapping service after controller
            for (let service of services) {
                if (typeof service.onAfterController === 'function') {
                    await service.onAfterController(new ServiceMetadata_1.ServiceMetadata(null, context));
                }
            }
            // Mapping service before destroy
            for (let service of services) {
                if (typeof service.onBeforeDestroy === 'function') {
                    await service.onBeforeDestroy(new ServiceMetadata_1.ServiceMetadata(null, context));
                }
            }
            // Mapping service destroyed
            for (let service of services) {
                if (typeof service.onDestroyed === 'function') {
                    await service.onDestroyed(new ServiceMetadata_1.ServiceMetadata(null, context));
                }
            }
            // Respond
            await this.respond(context);
            // If is not response throw 404
            if (!context.response.body)
                context.throw(404);
        }
        catch (error) {
            // Handler exception
            if (!(error instanceof HttpException_1.HttpException) && statuses[error.message]) {
                return this.exception(context, new HttpException_1.HttpException(error));
            }
            return this.exception(context, error);
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
     * createContext
     * Server context create method
     */
    createContext(req, res) {
        const request = new ServletRequest_1.ServletRequest(req, res, this);
        const response = new ServletResponse_1.ServletResponse(req, res, this);
        const context = new ServletContext_1.ServletContext(req, res, request, response, this);
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        return context;
    }
    /**
     * exception
     * Exception handler method
     */
    exception(context, error) {
        if (this.listeners('error').length > 0)
            this.emit('error', error);
        if (this.listeners('exception').length > 0) {
            return this.emit('exception', error);
        }
        else {
            if (this.env === 'development' && error.name !== 'HttpException' && !this.silent) {
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
    listen(...args) {
        const { ssl } = this.options;
        // ssl
        if (ssl) {
            https.createServer(ssl, (request, response) => this.start(request, response))
                .listen(...args);
        }
        else {
            http_1.createServer((request, response) => this.start(request, response))
                .listen(...args);
        }
        return this;
    }
    /**
     * registerProvider
     */
    registerProvider(service) {
        if (!this.providers)
            this.providers = new Map();
        this.providers.set(service.type, service);
    }
    /**
     * registerModule
     */
    registerModule(...modules) {
        this.router.parseModule(...modules);
    }
}
exports.Servlet = Servlet;
//# sourceMappingURL=Servlet.js.map