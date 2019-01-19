import { Route } from './Route';
import { Router } from './Router';
import { BASE, CONTROLLER } from '../constants/metadata.constant';
import { ServletContext } from '../core/ServletContext';
import { HttpException, HttpExceptionConstructor } from '../core/HttpException';

export class Layer {
    /**
     * 路由处理方法
     */
    public handler: Function;
    /**
     * 路由处理方法返回的数据类型
     */
    public returnType: any;
    /**
     * http响应的内容类型
     */
    public contentType: string;
    /**
     * 路径参数
     */
    public params: any;
    /**
     * 异常处理方法
     */
    public exception: HttpException;
    /**
     * 异常捕获方法
     */
    public exceptionCapture: HttpExceptionConstructor;
    /**
     * 路由处理方法要注入的数据
     */
    public handlerInjects: any[] = [];
    /**
     * http响应的状态码
     */
    public statusCode: number;
    /**
     * http响应的message
     */
    public statusMessage: string;
    constructor(router: Router, route: Route, context: ServletContext) {
        const { Module, Controller, propertyKey, keys, regexp } = route
        const dependencies = Reflect.getMetadata(BASE.PARAMTYPES, Controller)
        if (Array.isArray(dependencies)) {
            this.handler = new Controller(...dependencies.map((dependencie) => {
                return router.providerService.getProvider(Module, dependencie)
            }))[propertyKey]
        } else {
            this.handler = new Controller()[propertyKey]
        }
        this.returnType = Reflect.getMetadata(BASE.RETURNTYPE, Controller.prototype, propertyKey)
        this.contentType = Reflect.getMetadata(CONTROLLER.CONTENT_TYPE, Controller, propertyKey)
        this.exception = Reflect.getMetadata(CONTROLLER.EXCEPTION, Controller, propertyKey)
        this.statusCode = Reflect.getMetadata(CONTROLLER.STATUS_CODE, Controller, propertyKey)
        this.statusMessage = Reflect.getMetadata(CONTROLLER.STATUS_MESSAGE, Controller, propertyKey)
        this.exceptionCapture = Reflect.getMetadata(CONTROLLER.EXCEPTION_CAPTURE, Controller, propertyKey)
        const metadataResponse = Reflect.getMetadata(CONTROLLER.RESPONSE, Controller, propertyKey)
        const metadataRequest = Reflect.getMetadata(CONTROLLER.REQUEST, Controller, propertyKey)
        if (metadataResponse) this.handlerInjects[metadataResponse.index] = context.response
        if (metadataRequest) this.handlerInjects[metadataRequest.index] = context.request
        const params: any = this.params = {}
        const pathParams = regexp.exec(context.path)
        keys.forEach((k, i) => {
            params[k.name] = pathParams[i + 1]
        })
        console.log(this)
    }
}