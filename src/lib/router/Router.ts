import { RegExpOptions } from 'path-to-regexp'
import { CType } from '../decorators';
import { MetadataElementTypes, RequestElementTypes } from '../enums';
import { Route } from './Route';
import { Context } from '../core/Context';
import { Layer } from './Layer';
import { Stack } from './Stack';
import EasyBootServlet from '../core/EasyBootServlet';
import { DecoratorException } from '../exception';
import chalk from 'chalk';
const requestMappingTypes: any = {
    GET: 'GetMapping',
    DELETE: 'DeleteMapping',
    HEAD: 'HeadMapping',
    COPY: 'CopyMapping',
    PURGE: 'PurgeMapping',
    UNLOCK: 'UnlockMapping'
}

export class Router {
    public routes: Route[] = []
    constructor(public application: EasyBootServlet, public configs: RegExpOptions) {}
    public addRoute(Module: CType, Controller: CType) {
        const requestMapping = Reflect.getMetadata(MetadataElementTypes.Metadata.REQUEST_MAPPING, Controller)
        if (Array.isArray(requestMapping)) {
            requestMapping.forEach((metadata) => {
                if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(metadata.method)) {
                    const requestbody = Reflect.getMetadata(MetadataElementTypes.Metadata.REQUEST_BODY, Controller, metadata.propertyKey)
                    const requestfile = Reflect.getMetadata(MetadataElementTypes.Metadata.REQUEST_FILE, Controller, metadata.propertyKey)
                    if (requestbody || requestfile) {
                        const exceptionTrace: DecoratorException = Reflect.getMetadata(MetadataElementTypes.Metadata.EXCEPTION_TRACE, Controller)
                        if (exceptionTrace && this.application.bodyParserService.strict) {
                            const mapDecorator = '@' + requestMappingTypes[metadata.method]
                            const regx = RegExp(mapDecorator + '[\\w\\W]+' + metadata.propertyKey)
                            const file = (exceptionTrace as any).file
                            const match = regx.exec(file)
                            if (match[0]) {
                                const matchSplit = match[0].split(mapDecorator);
                                const index = file.indexOf(mapDecorator + matchSplit[matchSplit.length - 2])
                                if (!!~index) {
                                    const split: string[] = file.substr(0, index).split('\n')
                                    const row = split.length
                                    const col = split[split.length - 1].length + 1
                                    const files: string[] = file.split('\n')
                                    const value = chalk.underline.red(mapDecorator);
                                    const splice = files.splice(row).join('\n').replace(mapDecorator, value);
                                    (exceptionTrace as any).file = files.join('\n') + '\n' + splice
                                    const find = (exceptionTrace as any).file.indexOf(value);
                                    const splits: string[] = (exceptionTrace as any).file.substr(0, find).split('\n');
                                    (exceptionTrace as any).row = splits.length;
                                    (exceptionTrace as any).col = splits[splits.length - 1].length + 1;
                                    exceptionTrace.setMessage(`Invalid decorator, ${chalk.yellow(mapDecorator)} cannot use in ${chalk.yellow(`${requestbody ? '@RequestBody' : '@RequestFile'}`)} decorator.`)
                                }

                            }
                            throw exceptionTrace
                        }
                    }
                }
                this.routes.push(new Route(Controller, Module, this.configs, metadata))
            })
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
            if (context.response.body) return;
            await layer.parseParamMetadata(context)
            await layer.parseQueryMetadata(context)
            await layer.parseBodyMetadata(this.application.bodyParserService, context)
            await layer.parseRequestMetadata(context)
            await layer.parseResponseMetadata(context)
            const { Controller, propertyKey, Mod } = layer
            let metadata = Reflect.getMetadata(MetadataElementTypes.Metadata.PARAMTYPES, Controller) || []
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
