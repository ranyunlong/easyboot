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
            root: path_1.resolve('test', 'public')
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
                if (context.response.body)
                    return;
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
}
exports.Servlet = Servlet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL1NlcnZsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILCtCQUE4QjtBQUU5QixxQ0FBb0M7QUFDcEMsdUNBQXNDO0FBQ3RDLG1DQUErQjtBQUMvQixtQ0FBZ0M7QUFFaEMscURBQWlEO0FBQ2pELHFEQUFpRDtBQUNqRCx1REFBbUQ7QUFDbkQsK0JBQW9FO0FBRXBFLG1EQUFnRDtBQUNoRCxzRUFBc0Q7QUFFdEQsNkNBQTBDO0FBRTFDLGlGQUE4RTtBQUM5RSw2RUFBMEU7QUFDMUUsbUZBQWdGO0FBQ2hGLG1GQUFnRjtBQUNoRixpRkFBOEU7QUFDOUUsMkVBQXdFO0FBQ3hFLCtCQUErQjtBQUMvQix1REFBb0Q7QUFFcEQsTUFBYSxPQUFRLFNBQVEsWUFBWTtJQVNyQyxZQUFvQixPQUE4QjtRQUM5QyxLQUFLLEVBQUUsQ0FBQTtRQURTLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBRzlDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsd0JBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBRS9FLElBQUksYUFBYSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFBO1NBQ3JDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFFcEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUV6RCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVuRCxrQkFBa0I7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