/**
 * @class Layer
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { TClass } from '../Module';
import * as pathToRegexp from 'path-to-regexp'
import { ElementType } from './ElementType';
import { EasyBootEntityConstructor } from '../EasyBootEntity';

export class Layer {
    // 路由地址
    public path: string;
    // 请求方法
    public method: ElementType.METHOD;
    // 控制器类
    public target: TClass;
    // 对应控制器方法key
    public propertyKey: string;
    // 元数据
    public metadata: TClass[];
    // 路由正则
    public regexp: RegExp;
    // 路由正则keys
    public PathParamskeys: pathToRegexp.Key[];
    public _decoratorParams: Map<string, EasyBootEntityConstructor>;
    public _decoratorBodys: Map<string, EasyBootEntityConstructor>;
    public _decoratorpathParams: Map<string, {
        Entity: EasyBootEntityConstructor;
        keys: string[];
    }>;
    // 所属模块
    public _module: TClass;
    constructor(options: Options) {
        const {
            path = '',
            method,
            propertyKey = '',
            target,
            metadata = [],
            rootPath = '',
            params = new Map(),
            bodys = new Map(),
            pathParams = new Map(),
            config,
            _module,
        } = options
        this.path = `/${rootPath}/${path}`.replace(/[\/]{2,}/g, '/')
        this.method = method
        this.target = target
        this.propertyKey = propertyKey
        this.metadata = metadata
        this._module = _module
        this._decoratorParams = params
        this._decoratorBodys = bodys
        this._decoratorpathParams = pathParams
        this.PathParamskeys = []
        this.regexp = pathToRegexp(this.path, this.PathParamskeys, config)
    }
}

interface Options {
    path: string;
    method: ElementType.METHOD;
    propertyKey: string;
    target: TClass;
    metadata: TClass[];
    rootPath: string;
    params: Map<number, EasyBootEntityConstructor>;
    pathParams: Map<number, {
        Entity: EasyBootEntityConstructor;
        keys: string| string[];
    }>;
    bodys: Map<number, EasyBootEntityConstructor>;
    config: pathToRegexp.RegExpOptions;
    _module: TClass;
}
