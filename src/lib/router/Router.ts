import { RegExpOptions } from 'path-to-regexp'
import { ModuleMetadata, CType } from '../decorators';
import { MetadataElementTypes, RequestElementTypes } from '../enums';
import { Route } from './Route';
import { Context } from '../core/Context';
import { Layer } from './Layer';
import { Stack } from './Stack';
import EasyBootServlet from '../core/EasyBootServlet';

export class Router {
    public configs: RegExpOptions;
    public routes: Route[] = []
    constructor(public application: EasyBootServlet, options: Options) {
        const { rootModule, ...configs } = options
        this.configs = configs
        this.createRoute(rootModule as CType)
    }

    private createRoute(Module: CType) {
        const { CONTROLLERS, MODULES  } = MetadataElementTypes.Metadata
        const mControllers = Reflect.getMetadata(CONTROLLERS, Module)
        const mModules = Reflect.getMetadata(MODULES, Module)
        if (mControllers) {
            if (Array.isArray(mControllers)) {
                mControllers.forEach((mController) => {
                   const requestMapping = Reflect.getMetadata(MetadataElementTypes.Metadata.REQUEST_MAPPING, mController)
                   if (Array.isArray(requestMapping)) {
                       requestMapping.forEach((metadata) => {
                        this.routes.push(new Route(mController, Module, this.configs, metadata))
                       })
                   }
                })
            }
        }

        if (mModules) {
            if (Array.isArray(mModules)) {
                mModules.forEach((mModule) => {
                    this.createRoute(mModule)
                })
            }
        }
    }

    private matchRoute(path: string, method: RequestElementTypes.METHOD): Stack<Layer> {
        const matches = this.routes.filter((route) => {
            return route.regexp.test(path) && route.method === method
        }).map((route) => new Layer(route))
        return new Stack(...matches)
    }

    public async handleResponse(context: Context) {
        const stack = this.matchRoute(context.path, context.method as RequestElementTypes.METHOD)
        for (let layer of stack) {
            layer.parseParam(context)
            const { Controller, propertyKey, Mod } = layer
            let metadata = Reflect.getMetadata(MetadataElementTypes.Metadata.PARAMTYPES, Controller)
            if (Array.isArray(metadata)) {
                metadata = metadata.map((Service) => {
                    return this.application.metadataManager.queryProviders(Mod, Service)
                })
            }
            const data = await new Controller(...metadata)[propertyKey]()
            if (data) {
                context.body = data
            }
        }
    }
}

interface Options extends RegExpOptions {
    rootModule: ModuleMetadata;
}
