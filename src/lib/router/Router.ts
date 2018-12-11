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
                            console.warn(chalk.yellowBright('file: ' + exceptionTrace.getTarget()))
                            console.warn(chalk.yellowBright(`In route path '${metadata.path}', Now body parse mode strict cannot parse file or body.`))
                            console.warn(chalk.yellowBright(`You can use @PostMapping decorator.`))
                            console.warn(chalk.yellowBright(`Cannot be use @${requestMappingTypes[metadata.method]} decorator.`))
                            if (requestbody) console.warn(chalk.yellowBright(`Cannot be use @RequestBody decorator.`))
                            if (requestfile) console.warn(chalk.yellowBright(`Cannot be use @RequestFile decorator.`))
                            exceptionTrace.setMessage(`Invalid decorator ${chalk.yellow('@' + requestMappingTypes[metadata.method])}`)
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
