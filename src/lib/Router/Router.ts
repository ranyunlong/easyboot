/**
 * @class Router
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { RegExpOptions } from 'path-to-regexp'
import { TClass } from '../Module';
import { Propertys, Routes } from './RequestMapping';
import { Layer } from './Layer';
import { ElementType } from './ElementType';
import { Context } from '../Context';
import { Stack } from './Stack';
import { EasyBootEntityConstructor } from '../EasyBootEntity';
export class Router {
    public config: RegExpOptions;
    public layers: Layer[] = []
    constructor(public options: Options) {
        const { modules = [], ...config } = options
        this.config = config || {}
        modules.forEach((Module) => {
            const imodule = Module.prototype
            const { $controllers = [] } = imodule
            $controllers.forEach((contrl: TClass) => {
                const options: ControllerOptions = contrl.prototype || {}
                const {
                    $metadata = [],
                    $method = '',
                    $propertys = new Map<string, {
                        routes: Routes;
                        params: Map<number, EasyBootEntityConstructor>;
                        bodys: Map<number, EasyBootEntityConstructor>;
                        pathParams: Map<number, {
                            Entity: EasyBootEntityConstructor;
                            keys: string[];
                        }>;
                    }>(),
                    $route = ''
                } = options

                $propertys.forEach((property) => {
                    const { routes = new Map<string, {
                        path: string;
                        propertyKey: string;
                        method: ElementType.METHOD;
                    }>(), params, pathParams, bodys } = property
                    routes.forEach((route) => {
                        this.layers.push(new Layer({
                            ...route,
                            target: contrl,
                            metadata: $metadata,
                            rootPath: $route,
                            params,
                            pathParams,
                            bodys,
                            config,
                            _module: Module
                        }))
                    })
                })
            })
        })
    }
    public async handle(context: Context) {
        const matches = this.layers.filter((k) => {
            return context.method === k.method && k.regexp.test(context.path)
        })
        const stack: Layer[] = new Stack()
        stack.push(...matches)
        await this.handleResponse(matches, context)
    }

    private async handleResponse(layers: Layer[], context: Context) {
        for (let value of layers ) {
            if (!context.response.writable || typeof context.response.body !== 'undefined') return;
            // exec context path
            const execPathData = value.regexp.exec(context.path)
            const pathParams = new Map<string | number, any>()
            value.PathParamskeys.forEach((k, i) => {
                pathParams.set(k.name, execPathData[i + 1])
            })

            const params: any = []

            value._decoratorBodys.forEach((k) => {
                // console.log(k)
            })
            value._decoratorParams.forEach((k, i) => {
                console.log(k)
            })
            value._decoratorpathParams.forEach((k, i) => {
                const p: any = {}
                k.keys.forEach((key) => {
                    p[key] = pathParams.get(key)
                })
                params[i] = p
            })
            const { target, metadata, propertyKey } = value
            const controller = new target(...metadata.map((k) => new k(context)))
            const data = await controller[propertyKey](...params)
            if (data) {
                context.body = data
            }
        }
    }
}

interface Options extends RegExpOptions {
    modules: TClass[];
}

interface ControllerOptions {
    $propertys: Propertys;
    $route: string;
    $method: string;
    $metadata: TClass[];
}