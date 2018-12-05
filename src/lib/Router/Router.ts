/**
 * @class Router
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { RegExpOptions } from 'path-to-regexp'
import { Layer } from './Layer';
import { TClass, ModuleInterface } from '../Module';
import { Route } from './Route';
import { ControllerOptions, Property, RequestParameterDecoratorOptions } from '../Controller';
import { ElementType } from './ElementType';
import { Context } from '../Context';
import { Stack } from './Stack';
import { BodyParserService } from '../BodyParserService';
export class Router {
    public config: RegExpOptions;
    public routes: Route[] = [];
    public bodyService: BodyParserService;
    constructor(options: Options) {
        const { modules, bodyService, ...config } = options
        this.bodyService = bodyService
        this.config = config
        this.paraseModule(modules)
    }

    /**
     * createProviders
     */
    public createProviders(providers: TClass[] = []) {
        return providers.map((Service) => {
            return {
                provide: Service.name,
                useClass: Service,
                value: new Service(),
                token: Service.prototype.token
            }
        })
    }

    /**
     * paraseModule
     */
    private paraseModule(modules: TClass[] = []) {
        modules.forEach((Module) => {
            const moduleOptions: ModuleInterface = Module.prototype || {}
            const { controllers = [] } = moduleOptions
            const providers = this.createProviders(moduleOptions.providers)
            controllers.forEach((controller) => {
                const contollerOpts: ControllerOptions = controller.prototype || {}
                const { propertys = new Map<PropertyKey, Property>(), metadata, type } = contollerOpts
                if (type === 'controller') {
                    propertys.forEach((property) => {
                        // 添加路由
                        const {
                            params,
                            bodys,
                            setHeaders,
                            getHeaders,
                            statusCode,
                            statusMessage,
                            contentType,
                            exception,
                            exceptionCatch,
                            querys = new Map<number, RequestParameterDecoratorOptions>(),
                            routes = new Map<ElementType.METHOD, {
                                path: string;
                                propertyKey: string;
                                method: ElementType.METHOD;
                            }>()
                        } = property

                        routes.forEach((route) => {
                            const { propertyKey, method, path } = route
                            // 创建路由
                            const iRoute = new Route({
                                module: {
                                    controllers,
                                    providers,
                                    name: Module.name
                                },
                                routeMethod: method,
                                routePath: path,
                                parentRouteMethod: contollerOpts.method,
                                parentRoutePath: contollerOpts.path,
                                propertyKey,
                                controller,
                                decorators: {
                                    params,
                                    bodys,
                                    querys,
                                    metadata,
                                    setHeaders,
                                    getHeaders,
                                    statusCode,
                                    statusMessage,
                                    contentType,
                                    exception,
                                    exceptionCatch,
                                }
                            }, this.config)

                            this.routes.push(iRoute)
                        })
                    })
                    delete controller.prototype.propertys
                    delete controller.prototype.metadata
                    delete controller.prototype.type
                    delete controller.prototype.method
                    delete controller.prototype.path
                }
            })
        })
    }

    /**
     * matchRoute
     */
    private matchRoute(context: Context): Stack<Layer> {
        const routes = this.routes.filter((route) => {
            return  (context.method ===  route.method || route.method === 'ALL') && route.regexp.test(context.path)
        })
        const stack = new Stack<Layer>()
        stack.push(...routes.map(((route) => new Layer(route, context))))
        return stack
    }

    /**
     * handleResponse
     */
    public async handleResponse(context: Context) {
        const matchRoutes = this.matchRoute(context)
        for (let route of matchRoutes) {
            const { controller, handleKey, handleArguments } = route
            // Parse path params
            await route.parseParam(context)
            // Parse query params
            await route.parseQuery(context)
            // Parse body params
            await route.parseBody(context, this.bodyService)
            // Parse file params
            await route.parseFile(context, this.bodyService)
            // Handle response
            const data = await controller[handleKey](...handleArguments)
            if (data) {
                context.body = data
            }
        }
    }
}

interface Options extends RegExpOptions {
    modules: TClass[];
    bodyService: BodyParserService;
}