import { Route } from './Route';
import { Router } from './Router';
import { BASE, CONTROLLER } from '../constants/metadata.constant';
import { ServletContext } from '../core/ServletContext';
import { HttpException, HttpExceptionConstructor } from '../core/HttpException';
import { Ctor } from '../types/index.api';
import { ValidationMetadata } from '../validations/Validation';
import { toValidate } from '../validations/toValidate';
import * as pathToRegexp from 'path-to-regexp'
import { ServiceMetadata, MetadataParam, MetadataFile } from '../core/ServiceMetadata';

export class Layer {
    /**
     * 路由处理方法
     */
    public handler: Function;
    /**
     * 路由处理方法返回的数据类型
     */
    public get returnType(): Ctor {
        return this.metadata.returnType
    }
    /**
     * http响应的内容类型
     */
    public get contentType(): string {
        return this.metadata.contentType
    }
    /**
     * 路径参数
     */
    public params: any;
    /**
     * 异常处理方法
     */
    public get exception(): HttpException {
        return this.metadata.exception
    }
    /**
     * 异常捕获方法
     */
    public get exceptionCapture(): HttpExceptionConstructor {
        return this.metadata.exceptionCapture
    }
    /**
     * 路由处理方法要注入的数据
     */
    public readonly handlerInjects: any[] = [];
    /**
     * http响应的状态码
     */
    public get statusCode(): number {
        return this.metadata.statusCode
    }
    /**
     * http响应的message
     */
    public get statusMessage(): string {
        return this.metadata.statusMessage
    }
    /**
     * route path query
     */
    public readonly path: string;
    /**
     * metadata
     */
    public readonly metadata: LayerMetadata = {};
    /**
     *  route regexp
     */
    public regexp: RegExp;
    /**
     * path keys
     */
    public keys: pathToRegexp.Key[];
    /**
     * this route property name in controller
     */
    public propertyKey: string;
    constructor(router: Router, route: Route, context: ServletContext) {
        const { Controller, propertyKey, path, keys, regexp } = route
        this.path = path
        this.regexp = regexp
        this.keys = JSON.parse(JSON.stringify(keys))
        this.getMetadata(Controller, propertyKey)
        this.init(router, route)
    }

    /**
     * Get all metadate
     * @param Controller
     * @param propertyKey
     */
    private getMetadata(Controller: Ctor, propertyKey: string) {
        this.metadata.provider = Reflect.getMetadata(BASE.PARAMTYPES, Controller)
        this.metadata.returnType = Reflect.getMetadata(BASE.RETURNTYPE, Controller.prototype, propertyKey)
        this.metadata.contentType = Reflect.getMetadata(CONTROLLER.CONTENT_TYPE, Controller, propertyKey)
        this.metadata.exception = Reflect.getMetadata(CONTROLLER.EXCEPTION, Controller, propertyKey)
        this.metadata.statusCode = Reflect.getMetadata(CONTROLLER.STATUS_CODE, Controller, propertyKey)
        this.metadata.statusMessage = Reflect.getMetadata(CONTROLLER.STATUS_MESSAGE, Controller, propertyKey)
        this.metadata.exceptionCapture = Reflect.getMetadata(CONTROLLER.EXCEPTION_CAPTURE, Controller, propertyKey)
        this.metadata.response = Reflect.getMetadata(CONTROLLER.RESPONSE, Controller, propertyKey)
        this.metadata.request = Reflect.getMetadata(CONTROLLER.REQUEST, Controller, propertyKey)
        this.metadata.query = Reflect.getMetadata(CONTROLLER.REQUEST_QUERY, Controller, propertyKey)
        this.metadata.param = Reflect.getMetadata(CONTROLLER.REQUEST_PARAM, Controller, propertyKey)
        this.metadata.body = Reflect.getMetadata(CONTROLLER.REQUEST_BODY, Controller, propertyKey)
        this.metadata.entity = Reflect.getMetadata(BASE.PARAMTYPES, Controller.prototype, propertyKey)
        this.metadata.file = Reflect.getMetadata(CONTROLLER.REQUEST_FILE, Controller, propertyKey)
        this.metadata.session = Reflect.getMetadata(CONTROLLER.SESSION, Controller, propertyKey)
    }

    /**
     * Init layer
     * @param router
     * @param route
     * @param context
     */
    private init(router: Router, route: Route) {
        const {  Module, Controller, propertyKey } = route
        const dependencies = this.metadata.provider;
        if (Array.isArray(this.metadata.provider)) {
            let controller = new Controller(...dependencies.map((dependencie) => {
                return router.providerService.getProvider(Module, dependencie)
            }))
            this.handler = controller[propertyKey].bind(controller)
        } else {
            let controller = new Controller()
            this.handler = controller[propertyKey].bind(controller)
        }
    }

    /**
     * parse request query string
     * @param context
     */
    private async parseRequestQueryData(context: ServletContext) {
        let originData: any = {}
        const service = context.app.providers.get('query')
        if (service && typeof service.onLaunch === 'function') {
            originData = await service.onLaunch(new ServiceMetadata(this.metadata.query, context))
        }
        const Entity: Ctor = this.metadata.entity[this.metadata.query.index];
        return toValidate(originData || {}, this.metadata.query, Entity);
    }

    /**
     * parser request file
     * @param context
     */
    private async parseRequestFileData(context: ServletContext) {
        let originData: any = {}
        const service = context.app.providers.get('file')
        if (service && typeof service.onLaunch === 'function') {
            originData = await service.onLaunch(new ServiceMetadata<MetadataFile>(this.metadata.file, context))
        }
        const Entity: Ctor = this.metadata.entity[this.metadata.body.index];
        return toValidate(originData, this.metadata.body, Entity);
    }

    /**
     * parse request path param
     * @param context
     */
    private async parseRequestParamData(context: ServletContext) {
        let originData: any = {}
        const service = context.app.providers.get('param')
        if (service && typeof service.onLaunch === 'function') {
            originData = await service.onLaunch(new ServiceMetadata<MetadataParam>({
                keys: this.keys,
                regexp: this.regexp,
                data: this.metadata.param
            }, context))
        }
        const Entity: Ctor = this.metadata.entity[this.metadata.param.index];
        return toValidate(originData || {}, this.metadata.param, Entity);
    }

    /**
     * parse request body
     * @param context
     */
    private async parseRequestBodyData(context: ServletContext) {
        let originData: any = {}
        const service = context.app.providers.get('body')
        if (service && typeof service.onLaunch === 'function') {
            originData = await service.onLaunch(new ServiceMetadata(this.metadata.body, context))
        }
        const Entity: Ctor = this.metadata.entity[this.metadata.body.index];
        return toValidate(originData, this.metadata.body, Entity);
    }

    /**
     * parse request session
     * @param context
     */
    private async parseRequestSessionData(context: ServletContext) {
        const service = context.app.providers.get('session')
        if (service && typeof service.onLaunch === 'function')
        return await service.onLaunch(new ServiceMetadata(this.metadata.session, context))
    }

    /**
     * inject params
     * @param context
     */
    public async inject(context: ServletContext): Promise<void> {
        const { response, request, query, param, body, file, session } = this.metadata
        if (response) this.handlerInjects[response.index] = context.response
        if (request) this.handlerInjects[request.index] = context.request
        if (query) this.handlerInjects[query.index] = await this.parseRequestQueryData(context)
        if (param) this.handlerInjects[param.index] = await this.parseRequestParamData(context)
        if (body && !file) this.handlerInjects[body.index] = await this.parseRequestBodyData(context)
        if (file) this.handlerInjects[body.index] = await this.parseRequestFileData(context)
        if (session) this.handlerInjects[session.index] = await this.parseRequestSessionData(context)
    }
}

export interface LayerMetadata {
    query?: ValidationMetadata;
    body?: ValidationMetadata;
    param?: ValidationMetadata;
    file?: MetadataFile;
    entity?: Ctor[];
    provider?: Ctor[];
    returnType?: Ctor;
    contentType?: string;
    exception?: HttpException;
    statusCode?: number;
    statusMessage?: string;
    exceptionCapture?: HttpExceptionConstructor;
    response?: { index: number };
    request?: { index: number };
    session?: { index: number };
}