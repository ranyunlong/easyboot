/**
 * @class Router
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RegExpOptions } from 'path-to-regexp'
import { CType } from '../decorators';
import { MetadataEnums, RequestEnums } from '../enums';
import { Route } from './Route';
import { Context } from '../core/Context';
import { Layer } from './Layer';
import { Stack } from './Stack';
import EasyBootServlet from '../core/EasyBootServlet';

export class Router {
    public routes: Route[] = []
    constructor(public application: EasyBootServlet, public configs: RegExpOptions) {}
    public addRoute(Module: CType, Controller: CType) {
        const requestMapping = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_MAPPING, Controller)
        if (Array.isArray(requestMapping)) {
            requestMapping.forEach((metadata) => {
                if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(metadata.method)) {
                    const requestbody = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_BODY, Controller, metadata.propertyKey)
                    const requestfile = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_FILE, Controller, metadata.propertyKey)
                    if (requestbody || requestfile) {
                        // show error
                    }
                }
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
            if (context.response.body) return;
            await layer.parseParamMetadata(context)
            await layer.parseQueryMetadata(context)
            await layer.parseBodyMetadata(this.application.bodyParserService, context)
            await layer.parseRequestMetadata(context)
            await layer.parseResponseMetadata(context)
            const { Controller, propertyKey, Mod } = layer
            let metadata = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, Controller) || []
            if (Array.isArray(metadata)) {
                metadata = metadata.map((Service) => {
                    return this.application.metadataManager.queryProviders(Mod, Service)
                })
            }
            const data = await new Controller(...metadata)[propertyKey](...layer.handleMetadatas)
            if (data) {
                context.body = data
            }
        }
    }
}
