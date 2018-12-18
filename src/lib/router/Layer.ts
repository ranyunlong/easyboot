import { Route } from './Route';
import { RequestEnums, MetadataEnums } from '../enums';
import { Key } from 'path-to-regexp'
import { CType } from '../decorators';
import { Context } from '../core/Context';
import { paramValidator } from '../validation/paramValidator';
import { BodyParserService } from '../core/BodyParserService';
import { entityValidator } from '../validation/entityValidator';
export class Layer {
    public readonly method: RequestEnums.METHOD;
    public readonly path: string;
    public readonly propertyKey: string;
    public readonly pathParamsKeys: Key[] = [];
    public readonly regexp: RegExp;
    public readonly Controller: CType;
    public readonly Mod: CType;
    public readonly handleMetadatas: any[] = [];
    constructor(route: Route) {
        const { Module, method, routePath, regexp, pathParamsKeys, Controller, propertyKey } = route
        this.method = method
        this.path = routePath
        this.regexp = regexp
        this.pathParamsKeys = pathParamsKeys
        this.propertyKey = propertyKey
        this.Controller = Controller
        this.Mod = Module
    }

    public async parseParamMetadata(context: Context) {
        const paramMetadata = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_PARAM, this.Controller, this.propertyKey)
        if (paramMetadata) {
            const originParams: any = {}
            const originData = this.regexp.exec(context.path)
            this.pathParamsKeys.forEach((key, index) => {
                originParams[key.name] = originData[index + 1]
            })
            const handleMetadatas: any = this.handleMetadatas[paramMetadata.index] = paramValidator(originParams, paramMetadata)
            const paramtypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (Array.isArray(paramtypes)) {
                const Entity = paramtypes[paramMetadata.index]
                const result = entityValidator(Entity, originParams)
                if (result) this.handleMetadatas[paramMetadata.index] = result
            }
        }
    }

    public async parseBodyMetadata(bodyParseService: BodyParserService, context: Context) {
        const bodyMetadata = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_BODY, this.Controller, this.propertyKey)
        if (bodyMetadata) {
            const originQuerys = context.query
            this.handleMetadatas[bodyMetadata.index] = paramValidator(originQuerys, bodyMetadata)
            const paramtypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (Array.isArray(paramtypes)) {
                const Entity = paramtypes[bodyMetadata.index]
                const result = entityValidator(Entity, originQuerys)
                if (result) this.handleMetadatas[bodyMetadata.index] = result
            }
        }
    }

    public async parseQueryMetadata(context: Context) {
        const queryMetadata = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_QUERY, this.Controller, this.propertyKey)
        if (queryMetadata) {
            const originQuerys = context.query
            this.handleMetadatas[queryMetadata.index] = paramValidator(originQuerys, queryMetadata)
            const paramtypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (Array.isArray(paramtypes)) {
                const Entity = paramtypes[queryMetadata.index]
                const result = entityValidator(Entity, originQuerys)
                if (result) this.handleMetadatas[queryMetadata.index] = result
            }
        }
    }

    public async parseRequestMetadata(context: Context) {
        const metadata = Reflect.getMetadata(MetadataEnums.Controller.REQUEST, this.Controller, this.propertyKey)
        if (metadata) {
            const { index } = metadata
            if (typeof index !== 'number') return;
            this.handleMetadatas[index] = context.request
        }
    }

    public async parseResponseMetadata(context: Context) {
        const metadata = Reflect.getMetadata(MetadataEnums.Controller.RESPONSE, this.Controller, this.propertyKey)
        if (metadata) {
            const { index } = metadata
            if (typeof index !== 'number') return;
            this.handleMetadatas[index] = context.response
        }
    }
}