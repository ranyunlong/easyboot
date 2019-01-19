import { Servlet } from '../core/Servlet';
import { ProviderService } from './ProviderService';
import { RouterConfiguration } from '../configurations/RouterConfiguration';
import { Ctor } from '../types/index.api';
import { MODULE, CONTROLLER } from '../constants/metadata.constant';
import { Route } from './Route';
import { ServletContext } from '../core/ServletContext';
import { Layer } from './Layer';
import { Stack } from './Stack';

export class Router {
    public routes: Route[] = []
    public providerService: ProviderService;
    constructor(
        public application: Servlet,
        public configs?: RouterConfiguration
    ) {
        this.providerService = new ProviderService(this)
        if (!configs) {
            this.configs = new RouterConfiguration()
        }
    }

    public parseModule(...modules: Ctor[]) {
        modules.forEach((EModule) => {
            this.providerService.register(EModule)
            const controllers = Reflect.getMetadata(MODULE.CONTROLLERS, EModule)
            if (Array.isArray(controllers)) {
                controllers.forEach((Controller) => {
                    const routes = Reflect.getMetadata(CONTROLLER.REQUEST_MAPPING, Controller)
                    if (Array.isArray(routes)) {
                        routes.forEach((route) => {
                            this.routes.push(new Route(this, {
                                Module: EModule,
                                Controller,
                                ...route
                            }))
                        })
                    }
                })
            }
        })
    }

    public async matchRoutes(context: ServletContext) {
        return new Stack(
            ...this
                .routes
                .filter((route) => route.regexp.test(context.path) && (route.method === 'ALL' || route.method === context.method))
                .map((route: Route) => new Layer(this, route, context))
        )
    }
}