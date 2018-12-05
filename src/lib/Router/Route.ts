import { ElementType } from './ElementType';
import { TClass } from '../Module';
import * as pathToRegexp from 'path-to-regexp'
import { RequestParameterDecoratorOptions } from '../Controller';

export class Route {
    // 所属模块
    public readonly module: IModule = {}
    // 父路由路径
    public readonly parentRoutePath: string;
    // 父路由请求类型
    public readonly parentRouteMethod: ElementType.METHOD;
    // 当前路由的原始路由路径
    public readonly originRoutepath: string;
    // 当前路由的路径
    public readonly path: string;
    // 当前路由请求方法类型
    public readonly method: ElementType.METHOD;
    // 当前路由的正则
    public readonly regexp: RegExp;
    // 当前路由的path 参数
    public readonly pathParamsKeys: pathToRegexp.Key[] = []
    // 当前路由控制器类
    public readonly controller: TClass;
    // 当前路由在控制器的handle key
    public readonly handleKey: string;
    // 装饰器数据
    public readonly decorators: DecoratorDatas = {}
    constructor(options: RouteOptions, private regexpOptions: pathToRegexp.RegExpOptions = {}) {
        const {
            controller,
            module,
            routeMethod,
            parentRouteMethod,
            parentRoutePath,
            routePath,
            propertyKey,
            decorators
        } = options
        this.module = module
        this.controller = controller
        this.method = routeMethod
        this.parentRouteMethod = parentRouteMethod
        this.parentRoutePath = parentRoutePath
        this.originRoutepath = routePath
        this.handleKey = propertyKey
        this.decorators = decorators
        // Create path
        this.path = `/${parentRoutePath}/${routePath || this.handleKey }`.replace(/[\/]{2,}/g, '/')
        // Create regexp
        this.regexp = pathToRegexp(this.path, this.pathParamsKeys, this.regexpOptions)
    }

}

export interface IModule {
    controllers?: TClass[];
    name?: string;
    providers?: Array<{
        provide?: string;
        useClass?: TClass<any, any>;
        value?: object;
        token?: string;
    }>
}

export interface RouteOptions {
    module?: IModule;
    parentRoutePath?: string;
    parentRouteMethod?: ElementType.METHOD;
    routeMethod?: ElementType.METHOD;
    routePath?: string;
    controller?: TClass;
    propertyKey?: string;
    decorators?: DecoratorDatas;
}

export interface DecoratorDatas {
    metadata?: TClass[];
    querys?: MappingDataParams;
    bodys?: MappingDataParams;
    params?: MappingDataParams;
    setHeaders?: Map<string, string>;
    getHeaders?: Map<string, string>;
    statusCode?: number;
    statusMessage?: string;
    contentType?: string;
    exception?: any;
    exceptionCatch?: any;
}

export type MappingDataParams = Map<number, RequestParameterDecoratorOptions>;

export interface Validator {
    message?: string;
    validator?: ValidatorJS.ValidatorStatic[keyof ValidatorJS.ValidatorStatic];
    validatorType: string;
    options?: any;
}