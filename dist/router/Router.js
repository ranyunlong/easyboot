"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProviderService_1 = require("./ProviderService");
const RouterConfiguration_1 = require("../configurations/RouterConfiguration");
const metadata_constant_1 = require("../constants/metadata.constant");
const Route_1 = require("./Route");
const Layer_1 = require("./Layer");
const Stack_1 = require("./Stack");
class Router {
    constructor(application, configs) {
        this.application = application;
        this.configs = configs;
        this.routes = [];
        this.providerService = new ProviderService_1.ProviderService(this);
        if (!configs) {
            this.configs = new RouterConfiguration_1.RouterConfiguration();
        }
    }
    parseModule(...modules) {
        modules.forEach((EModule) => {
            this.providerService.register(EModule);
            const controllers = Reflect.getMetadata(metadata_constant_1.MODULE.CONTROLLERS, EModule);
            if (Array.isArray(controllers)) {
                controllers.forEach((Controller) => {
                    const routes = Reflect.getMetadata(metadata_constant_1.CONTROLLER.REQUEST_MAPPING, Controller);
                    if (Array.isArray(routes)) {
                        routes.forEach((route) => {
                            this.routes.push(new Route_1.Route(this, {
                                Module: EModule,
                                Controller,
                                ...route
                            }));
                        });
                    }
                });
            }
        });
    }
    async matchRoutes(context) {
        return new Stack_1.Stack(...this
            .routes
            .filter((route) => route.regexp.test(context.path) && (route.method === 'ALL' || route.method === context.method))
            .map((route) => new Layer_1.Layer(this, route, context)));
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map