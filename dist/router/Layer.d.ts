import { Route } from './Route';
import { Router } from './Router';
import { ServletContext } from '../core/ServletContext';
import { HttpException, HttpExceptionConstructor } from '../core/HttpException';
import { ValidationMetadata } from '../validations/Validation';
import * as pathToRegexp from 'path-to-regexp';
import { MetadataFile } from '../core/ServiceMetadata';
import { Ctor } from '../core/Servlet';
export declare class Layer {
    /**
     * 路由处理方法
     */
    handler: Function;
    /**
     * 路由处理方法返回的数据类型
     */
    readonly returnType: Ctor;
    /**
     * http响应的内容类型
     */
    readonly contentType: string;
    /**
     * 路径参数
     */
    params: any;
    /**
     * 异常处理方法
     */
    readonly exception: HttpException;
    /**
     * 异常捕获方法
     */
    readonly exceptionCapture: HttpExceptionConstructor;
    /**
     * 路由处理方法要注入的数据
     */
    readonly handlerInjects: any[];
    /**
     * http响应的状态码
     */
    readonly statusCode: number;
    /**
     * http响应的message
     */
    readonly statusMessage: string;
    /**
     * route path query
     */
    readonly path: string;
    /**
     * metadata
     */
    readonly metadata: LayerMetadata;
    /**
     *  route regexp
     */
    regexp: RegExp;
    /**
     * path keys
     */
    keys: pathToRegexp.Key[];
    /**
     * this route property name in controller
     */
    propertyKey: string;
    constructor(router: Router, route: Route, context: ServletContext);
    /**
     * Get all metadate
     * @param Controller
     * @param propertyKey
     */
    private getMetadata;
    /**
     * Init layer
     * @param router
     * @param route
     * @param context
     */
    private init;
    /**
     * parse request query string
     * @param context
     */
    private parseRequestQueryData;
    /**
     * parser request file
     * @param context
     */
    private parseRequestFileData;
    /**
     * parse request path param
     * @param context
     */
    private parseRequestParamData;
    /**
     * parse request body
     * @param context
     */
    private parseRequestBodyData;
    /**
     * parse request session
     * @param context
     */
    private parseRequestSessionData;
    /**
     * inject params
     * @param context
     */
    inject(context: ServletContext): Promise<void>;
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
    response?: {
        index: number;
    };
    request?: {
        index: number;
    };
    session?: {
        index: number;
    };
}
