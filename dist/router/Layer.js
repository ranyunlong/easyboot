"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const toValidate_1 = require("../validations/toValidate");
const ServiceMetadata_1 = require("../core/ServiceMetadata");
class Layer {
    constructor(router, route, context) {
        /**
         * 路由处理方法要注入的数据
         */
        this.handlerInjects = [];
        /**
         * metadata
         */
        this.metadata = {};
        const { Controller, propertyKey, path, keys, regexp } = route;
        this.path = path;
        this.regexp = regexp;
        this.keys = JSON.parse(JSON.stringify(keys));
        this.getMetadata(Controller, propertyKey);
        this.init(router, route);
    }
    /**
     * 路由处理方法返回的数据类型
     */
    get returnType() {
        return this.metadata.returnType;
    }
    /**
     * http响应的内容类型
     */
    get contentType() {
        return this.metadata.contentType;
    }
    /**
     * 异常处理方法
     */
    get exception() {
        return this.metadata.exception;
    }
    /**
     * 异常捕获方法
     */
    get exceptionCapture() {
        return this.metadata.exceptionCapture;
    }
    /**
     * http响应的状态码
     */
    get statusCode() {
        return this.metadata.statusCode;
    }
    /**
     * http响应的message
     */
    get statusMessage() {
        return this.metadata.statusMessage;
    }
    /**
     * Get all metadate
     * @param Controller
     * @param propertyKey
     */
    getMetadata(Controller, propertyKey) {
        this.metadata.provider = Reflect.getMetadata(metadata_constant_1.BASE.PARAMTYPES, Controller);
        this.metadata.returnType = Reflect.getMetadata(metadata_constant_1.BASE.RETURNTYPE, Controller.prototype, propertyKey);
        this.metadata.contentType = Reflect.getMetadata(metadata_constant_1.CONTROLLER.CONTENT_TYPE, Controller, propertyKey);
        this.metadata.exception = Reflect.getMetadata(metadata_constant_1.CONTROLLER.EXCEPTION, Controller, propertyKey);
        this.metadata.statusCode = Reflect.getMetadata(metadata_constant_1.CONTROLLER.STATUS_CODE, Controller, propertyKey);
        this.metadata.statusMessage = Reflect.getMetadata(metadata_constant_1.CONTROLLER.STATUS_MESSAGE, Controller, propertyKey);
        this.metadata.exceptionCapture = Reflect.getMetadata(metadata_constant_1.CONTROLLER.EXCEPTION_CAPTURE, Controller, propertyKey);
        this.metadata.response = Reflect.getMetadata(metadata_constant_1.CONTROLLER.RESPONSE, Controller, propertyKey);
        this.metadata.request = Reflect.getMetadata(metadata_constant_1.CONTROLLER.REQUEST, Controller, propertyKey);
        this.metadata.query = Reflect.getMetadata(metadata_constant_1.CONTROLLER.REQUEST_QUERY, Controller, propertyKey);
        this.metadata.param = Reflect.getMetadata(metadata_constant_1.CONTROLLER.REQUEST_PARAM, Controller, propertyKey);
        this.metadata.body = Reflect.getMetadata(metadata_constant_1.CONTROLLER.REQUEST_BODY, Controller, propertyKey);
        this.metadata.entity = Reflect.getMetadata(metadata_constant_1.BASE.PARAMTYPES, Controller.prototype, propertyKey);
        this.metadata.file = Reflect.getMetadata(metadata_constant_1.CONTROLLER.REQUEST_FILE, Controller, propertyKey);
        this.metadata.session = Reflect.getMetadata(metadata_constant_1.CONTROLLER.SESSION, Controller, propertyKey);
    }
    /**
     * Init layer
     * @param router
     * @param route
     * @param context
     */
    init(router, route) {
        const { Module, Controller, propertyKey } = route;
        const dependencies = this.metadata.provider;
        if (Array.isArray(this.metadata.provider)) {
            let controller = new Controller(...dependencies.map((dependencie) => {
                return router.providerService.getProvider(Module, dependencie);
            }));
            this.handler = controller[propertyKey].bind(controller);
        }
        else {
            let controller = new Controller();
            this.handler = controller[propertyKey].bind(controller);
        }
    }
    /**
     * parse request query string
     * @param context
     */
    async parseRequestQueryData(context) {
        let originData = {};
        const service = context.app.providers.get('query');
        if (service && typeof service.onLaunch === 'function') {
            originData = await service.onLaunch(new ServiceMetadata_1.ServiceMetadata(this.metadata.query, context));
        }
        const Entity = this.metadata.entity[this.metadata.query.index];
        return toValidate_1.toValidate(originData || {}, this.metadata.query, Entity);
    }
    /**
     * parser request file
     * @param context
     */
    async parseRequestFileData(context) {
        let originData = {};
        const service = context.app.providers.get('file');
        if (service && typeof service.onLaunch === 'function') {
            originData = await service.onLaunch(new ServiceMetadata_1.ServiceMetadata(this.metadata.file, context));
        }
        const Entity = this.metadata.entity[this.metadata.body.index];
        return toValidate_1.toValidate(originData, this.metadata.body, Entity);
    }
    /**
     * parse request path param
     * @param context
     */
    async parseRequestParamData(context) {
        let originData = {};
        const service = context.app.providers.get('param');
        if (service && typeof service.onLaunch === 'function') {
            originData = await service.onLaunch(new ServiceMetadata_1.ServiceMetadata({
                keys: this.keys,
                regexp: this.regexp,
                data: this.metadata.param
            }, context));
        }
        const Entity = this.metadata.entity[this.metadata.param.index];
        return toValidate_1.toValidate(originData || {}, this.metadata.param, Entity);
    }
    /**
     * parse request body
     * @param context
     */
    async parseRequestBodyData(context) {
        let originData = {};
        const service = context.app.providers.get('body');
        if (service && typeof service.onLaunch === 'function') {
            originData = await service.onLaunch(new ServiceMetadata_1.ServiceMetadata(this.metadata.body, context));
        }
        const Entity = this.metadata.entity[this.metadata.body.index];
        return toValidate_1.toValidate(originData, this.metadata.body, Entity);
    }
    /**
     * parse request session
     * @param context
     */
    async parseRequestSessionData(context) {
        const service = context.app.providers.get('session');
        if (service && typeof service.onLaunch === 'function')
            return await service.onLaunch(new ServiceMetadata_1.ServiceMetadata(this.metadata.session, context));
    }
    /**
     * inject params
     * @param context
     */
    async inject(context) {
        const { response, request, query, param, body, file, session } = this.metadata;
        if (response)
            this.handlerInjects[response.index] = context.response;
        if (request)
            this.handlerInjects[request.index] = context.request;
        if (query)
            this.handlerInjects[query.index] = await this.parseRequestQueryData(context);
        if (param)
            this.handlerInjects[param.index] = await this.parseRequestParamData(context);
        if (body && !file)
            this.handlerInjects[body.index] = await this.parseRequestBodyData(context);
        if (file)
            this.handlerInjects[body.index] = await this.parseRequestFileData(context);
        if (session)
            this.handlerInjects[session.index] = await this.parseRequestSessionData(context);
    }
}
exports.Layer = Layer;
//# sourceMappingURL=Layer.js.map