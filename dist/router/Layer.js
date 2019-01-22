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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVyL0xheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsc0VBQWtFO0FBS2xFLDBEQUF1RDtBQUV2RCw2REFBdUY7QUFFdkYsTUFBYSxLQUFLO0lBcUVkLFlBQVksTUFBYyxFQUFFLEtBQVksRUFBRSxPQUF1QjtRQXBDakU7O1dBRUc7UUFDYSxtQkFBYyxHQUFVLEVBQUUsQ0FBQztRQWlCM0M7O1dBRUc7UUFDYSxhQUFRLEdBQWtCLEVBQUUsQ0FBQztRQWN6QyxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQTtRQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUF2RUQ7O09BRUc7SUFDSCxJQUFXLFVBQVU7UUFDakIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQTtJQUNuQyxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxJQUFXLFdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQTtJQUNwQyxDQUFDO0lBS0Q7O09BRUc7SUFDSCxJQUFXLFNBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQTtJQUNsQyxDQUFDO0lBQ0Q7O09BRUc7SUFDSCxJQUFXLGdCQUFnQjtRQUN2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