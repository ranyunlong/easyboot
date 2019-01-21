import { Route } from './Route';
import { Router } from './Router';
import { BASE, CONTROLLER } from '../constants/metadata.constant';
import { ServletContext } from '../core/ServletContext';
import { HttpException, HttpExceptionConstructor } from '../core/HttpException';
import { Ctor } from '../types/index.api';
import { ValidationMetadata } from '../validations/Validation';
import { toValidate } from '../validations/toValidate';
import pathToRegexp = require('path-to-regexp');

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
    public handlerInjects: any[] = [];
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
     * metadata request query
     */
    public metadata: {
        query?: ValidationMetadata;
        body?: ValidationMetadata;
        param?: ValidationMetadata;
        entity?: Ctor;
        provider?: Ctor[];
        returnType?: Ctor;
        contentType?: string;
        exception?: HttpException;
        statusCode?: number;
        statusMessage?: string;
        exceptionCapture?: HttpExceptionConstructor;
        response?: { index: number };
        request?: { index: number };
    } = {};
    public metadataRequestQuery: any;
    constructor(router: Router, route: Route, context: ServletContext) {
        const { Module, Controller, propertyKey, keys, regexp } = route
        this.getMetadata(Controller, propertyKey)
        this.init(Module, Controller, router, propertyKey, keys, regexp, context)
    }
    public getMetadata(Controller: Ctor, propertyKey: string) {
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
        this.metadata.entity = Reflect.getMetadata(BASE.PARAMTYPES, Controller.prototype, propertyKey)
    }

    private init(Module: Ctor, Controller: Ctor, router: Router, propertyKey: string, keys: pathToRegexp.Key[], regexp: RegExp, context: ServletContext) {
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

        const params: any = this.params = {}
        const pathParams = regexp.exec(context.path)
        keys.forEach((k, i) => {
            params[k.name] = pathParams[i + 1]
        })
    }

    private async parseRequestQueryData(context: ServletContext) {
        return toValidate(context.query || {}, this.metadata.query, this.metadata.entity)
    }

    private async parseRequestParamData(context: ServletContext) {
        return toValidate(this.params || {}, this.metadata.param, this.metadata.entity)
    }

    private async parseRequestBodyData(context: ServletContext) {
        return toValidate(this.params, this.metadata.body, this.metadata.entity)
    }

    public async inject(context: ServletContext): Promise<void> {
        const { response, request, query, param, body } = this.metadata
        if (response) this.handlerInjects[response.index] = context.response
        if (request) this.handlerInjects[request.index] = context.request
        if (query) this.handlerInjects[query.index] = await this.parseRequestQueryData(context)
        if (param) this.handlerInjects[param.index] = await this.parseRequestParamData(context)
        if (body) this.handlerInjects[body.index] = await this.parseRequestBodyData(context)
    }
}