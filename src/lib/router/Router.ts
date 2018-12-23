/**
 * @class Router
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import 'reflect-metadata'
import { Layer } from './Layer';
import { Stack } from './Stack';
import { Route } from './Route';
import { CType } from '../decorators';
import { Context } from '../core/Context';
import { RegExpOptions } from 'path-to-regexp'
import { MetadataEnums, RequestEnums } from '../enums';
import EasyBootServlet from '../core/EasyBootServlet';
import { HttpException } from '../core';

export class Router {
    public routes: Route[] = []
    constructor(public application: EasyBootServlet, public configs: RegExpOptions) {}
    public addRoute(Module: CType, Controller: CType) {
        const requestMapping = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_MAPPING, Controller)
        if (Array.isArray(requestMapping)) {
            requestMapping.forEach((metadata) => {
                this.routes.push(new Route(Controller, Module, this.configs, metadata))
            })
        }
    }

    private matchRoute(path: string, method: RequestEnums.METHOD): Stack<Layer> {
        const matches = this.routes.filter((route) => {
            return route.regexp.test(path) && route.method === method
        }).map((route) => new Layer(route))
        return new Stack(...matches)
    }

    public async handleResponse(context: Context) {
        const stack = this.matchRoute(context.path, context.method as RequestEnums.METHOD)
        for (let layer of stack) {
            const handlerException = (error: HttpException) => {
                if (layer.exceptionCapture) {
                    this.application.exception(context, new layer.exceptionCapture(error))
                }
                if (layer.exception) {
                    this.application.exception(context, layer.exception)
                }
            }

            // Add exception event listener
            this.application.once('err', handlerException)

            // Check body is writeble
            if (context.response.body) return;

            // Parse request path params metadata
            await layer.parseParamMetadata(context)

            // Parse request query string metadata
            await layer.parseQueryMetadata(context)

            // Parse request body metadata
            await layer.parseBodyMetadata(this.application.bodyParserService, context)

            // Inject Request Object
            await layer.parseRequestMetadata(context)

            // Inject Response Object
            await layer.parseResponseMetadata(context)

            // Inject Session Object
            await layer.parseSessionMetadata(context)

            const { Controller, propertyKey, Mod } = layer
            // Controllr inject service
            let metadata = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, Controller) || []
            if (Array.isArray(metadata)) {
                metadata = metadata.map((Service) => {
                    return this.application.metadataManager.queryProviders(Mod, Service)
                })
            }

            // Handler response
            const data = await new Controller(...metadata)[propertyKey](...layer.handleMetadatas)
            if (data) {
                context.body = data

                // Set response status code
                if (layer.statusCode) context.response.status = layer.statusCode
                // Set response status message
                if (layer.statusMessage) context.response.message = layer.statusMessage
                // Set response content type
                if (layer.contentType) context.response.type = layer.contentType
            }

            // If not exception, cancel exception event listener
            this.application.off('err', handlerException)
        }
    }
}
