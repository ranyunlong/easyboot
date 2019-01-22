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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlci9Sb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1REFBb0Q7QUFDcEQsK0VBQTRFO0FBRTVFLHNFQUFvRTtBQUNwRSxtQ0FBZ0M7QUFFaEMsbUNBQWdDO0FBQ2hDLG1DQUFnQztBQUVoQyxNQUFhLE1BQU07SUFHZixZQUNXLFdBQW9CLEVBQ3BCLE9BQTZCO1FBRDdCLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBSmpDLFdBQU0sR0FBWSxFQUFFLENBQUE7UUFNdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDaEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSx5Q0FBbUIsRUFBRSxDQUFBO1NBQzNDO0lBQ0wsQ0FBQztJQUVNLFdBQVcsQ0FBQyxHQUFHLE9BQWU7UUFDakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3RDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsMEJBQU0sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDcEUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUM1QixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQy9CLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsOEJBQVUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUE7b0JBQzFFLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUU7Z0NBQzdCLE1BQU0sRUFBRSxPQUFPO2dDQUNmLFVBQVU7Z0NBQ1YsR0FBRyxLQUFLOzZCQUNYLENBQUMsQ0FBQyxDQUFBO3dCQUNQLENBQUMsQ0FBQyxDQUFBO3FCQUNMO2dCQUNMLENBQUMsQ0FBQyxDQUFBO2FBQ0w7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQXVCO1FBQzVDLE9BQU8sSUFBSSxhQUFLLENBQ1osR0FBRyxJQUFJO2FBQ0YsTUFBTTthQUNOLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDakgsR0FBRyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLGFBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQzlELENBQUE7SUFDTCxDQUFDO0NBQ0o7QUExQ0Qsd0JBMENDIn0=