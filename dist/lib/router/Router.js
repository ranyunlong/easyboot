"use strict";
/**
 * @class Router
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Layer_1 = require("./Layer");
const Stack_1 = require("./Stack");
const Route_1 = require("./Route");
const enums_1 = require("../enums");
class Router {
    constructor(application, configs) {
        this.application = application;
        this.configs = configs;
        this.routes = [];
    }
    addRoute(Module, Controller) {
        const requestMapping = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST_MAPPING, Controller);
        if (Array.isArray(requestMapping)) {
            requestMapping.forEach((metadata) => {
                this.routes.push(new Route_1.Route(Controller, Module, this.configs, metadata));
            });
        }
    }
    matchRoute(path, method) {
        const matches = this.routes.filter((route) => {
            return route.regexp.test(path) && route.method === method;
        }).map((route) => new Layer_1.Layer(route));
        return new Stack_1.Stack(...matches);
    }
    async handleResponse(context) {
        const stack = this.matchRoute(context.path, context.method);
        for (let layer of stack) {
            const handlerException = (error) => {
                if (layer.exceptionCapture) {
                    this.application.exception(context, new layer.exceptionCapture(error));
                }
                if (layer.exception) {
                    this.application.exception(context, layer.exception);
                }
            };
            // Add exception event listener
            this.application.once('err', handlerException);
            // Check body is writeble
            if (context.response.body)
                return;
            // Parse request path params metadata
            await layer.parseParamMetadata(context);
            // Parse request query string metadata
            await layer.parseQueryMetadata(context);
            // Parse request body metadata
            await layer.parseBodyMetadata(this.application.bodyParserService, context);
            // Inject Request Object
            await layer.parseRequestMetadata(context);
            // Inject Response Object
            await layer.parseResponseMetadata(context);
            // Inject Session Object
            await layer.parseSessionMetadata(context);
            const { Controller, propertyKey, Mod } = layer;
            // Controllr inject service
            let metadata = Reflect.getMetadata(enums_1.MetadataEnums.Base.PARAMTYPES, Controller) || [];
            if (Array.isArray(metadata)) {
                metadata = metadata.map((Service) => {
                    return this.application.metadataManager.queryProviders(Mod, Service);
                });
            }
            // Handler response
            const data = await new Controller(...metadata)[propertyKey](...layer.handleMetadatas);
            if (data) {
                context.body = data;
                // Set response status code
                if (layer.statusCode)
                    context.response.status = layer.statusCode;
                // Set response status message
                if (layer.statusMessage)
                    context.response.message = layer.statusMessage;
                // Set response content type
                if (layer.contentType)
                    context.response.type = layer.contentType;
            }
            // If not exception, cancel exception event listener
            this.application.off('err', handlerException);
        }
    }
}
exports.Router = Router;
