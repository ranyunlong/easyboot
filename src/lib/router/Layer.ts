import { Route } from './Route';
import { RequestElementTypes, MetadataElementTypes } from '../enums';
import { Key } from 'path-to-regexp'
import { CType } from '../decorators';
import { Context } from '../core/Context';
import { validate } from '../validator/validate';
export class Layer {
    public readonly method: RequestElementTypes.METHOD;
    public readonly path: string;
    public readonly propertyKey: string;
    public readonly pathParamsKeys: Key[] = []
    public readonly regexp: RegExp;
    public readonly Controller: CType;
    public readonly Mod: CType;
    constructor(route: Route) {
        const { iModule, method, routePath, regexp, pathParamsKeys, Controller, propertyKey } = route
        this.method = method
        this.path = routePath
        this.regexp = regexp
        this.pathParamsKeys = pathParamsKeys
        this.propertyKey = propertyKey
        this.Controller = Controller
        this.Mod = iModule
    }

    public parseParam(context: Context) {
        const param = Reflect.getMetadata(MetadataElementTypes.Metadata.REQUEST_PARAM, this.Controller, this.propertyKey)
        if (param) {
            const originParams: any = {}
            const originData = this.regexp.exec(context.path)
            this.pathParamsKeys.forEach((key, index) => {
                originParams[key.name] = originData[index + 1]
            })
            validate(originParams, param)
        }
    }
}