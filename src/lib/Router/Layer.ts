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
    // 参数装饰器数据
    public params: { [index: number]: any };
    // 路由正则
    public regexp: RegExp;
    // 路由正则keys
    public keys: pathToRegexp.Key[];
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
            config
        } = options
        this.path = `/${rootPath}/${path}`.replace(/[\/]{2,}/g, '/')
        this.method = method
        this.target = target
        this.propertyKey = propertyKey
        this.metadata = metadata
        this.params = []
        params.forEach((value, i) => {
            this.params[i] = value
        })
        bodys.forEach((value, i) => {
            this.params[i] = value
        })
        this.keys = []
        this.regexp = pathToRegexp(this.path, this.keys, config)
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
    bodys: Map<number, EasyBootEntityConstructor>;
    config: pathToRegexp.RegExpOptions;
}