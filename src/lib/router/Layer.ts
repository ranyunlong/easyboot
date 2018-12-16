import { Route } from './Route';
import { RequestEnums, MetadataEnums } from '../enums';
import { Key } from 'path-to-regexp'
import { CType } from '../decorators';
import { Context } from '../core/Context';
import { paramValidator } from '../validation/paramValidator';
import { ArgumentMetadata } from '../ArgumentMetadata';
import { EasyBootEntity } from '../EasyBootEntity';
import { BodyParserService } from '../core/BodyParserService';
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
        const paramMetadata = Reflect.getMetadata(MetadataEnums.Metadata.REQUEST_PARAM, this.Controller, this.propertyKey)
        if (paramMetadata) {
            const originParams: any = {}
            const originData = this.regexp.exec(context.path)
            this.pathParamsKeys.forEach((key, index) => {
                originParams[key.name] = originData[index + 1]
            })
            const handleMetadatas: any = this.handleMetadatas[paramMetadata.index] = paramValidator(originParams, paramMetadata)
            const paramtypes = Reflect.getMetadata(MetadataEnums.Metadata.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (Array.isArray(paramtypes)) {
                const Entity = paramtypes[paramMetadata.index]
                const validations =  Reflect.getMetadata(MetadataEnums.Metadata.VALIDATORS, Entity.prototype)
                if (Array.isArray(validations)) {
                    if (typeof handleMetadatas !== 'object') {
                        throw new TypeError(`Invalid type ${Entity.name}: In module: ${this.Mod.name}, Controller: ${this.Controller.name}, property: ${this.propertyKey}, route: ${this.path}`)
                    }
                    const entity: EasyBootEntity = new Entity()
                    Object.keys(handleMetadatas).forEach((k) => {
                        (entity as any)[k] = handleMetadatas[k]
                    })
                    validations.forEach(({validation, propertyKey}) => {
                        const metatype = Reflect.getMetadata(MetadataEnums.Metadata.TYPE, Entity.prototype, propertyKey);
                        const data = (entity as any).transform(handleMetadatas[propertyKey], new ArgumentMetadata('param', metatype, validation, propertyKey));
                        (entity as any)[propertyKey] = data
                    })
                    this.handleMetadatas[paramMetadata.index] = entity
                }
            }
        }
    }

    public async parseBodyMetadata(bodyParseService: BodyParserService, context: Context) {
        const bodyMetadata = Reflect.getMetadata(MetadataEnums.Metadata.REQUEST_BODY, this.Controller, this.propertyKey)
        if (bodyMetadata) {
            const originBodys = await bodyParseService.parseBody(context)
            const handleMetadatas: any = this.handleMetadatas[bodyMetadata.index] = paramValidator(originBodys, bodyMetadata)
            const paramtypes = Reflect.getMetadata(MetadataEnums.Metadata.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (Array.isArray(paramtypes)) {
                const Entity = paramtypes[bodyMetadata.index]
                const validations =  Reflect.getMetadata(MetadataEnums.Metadata.VALIDATORS, Entity.prototype)
                if (Array.isArray(validations)) {
                    if (typeof handleMetadatas !== 'object') {
                        throw new TypeError(`Invalid type ${Entity.name}: In module: ${this.Mod.name}, Controller: ${this.Controller.name}, property: ${this.propertyKey}, route: ${this.path}`)
                    }
                    const entity: EasyBootEntity = new Entity()
                    Object.keys(handleMetadatas).forEach((k) => {
                        (entity as any)[k] = handleMetadatas[k]
                    })
                    validations.forEach(({validation, propertyKey}) => {
                        const metatype = Reflect.getMetadata(MetadataEnums.Metadata.TYPE, Entity.prototype, propertyKey);
                        const data = (entity as any).transform(handleMetadatas[propertyKey], new ArgumentMetadata('param', metatype, validation, propertyKey));
                        (entity as any)[propertyKey] = data
                    })
                    this.handleMetadatas[bodyMetadata.index] = entity
                }
            }
        }
    }

    public async parseQueryMetadata(context: Context) {
        const bodyMetadata = Reflect.getMetadata(MetadataEnums.Metadata.REQUEST_QUERY, this.Controller, this.propertyKey)
        if (bodyMetadata) {
            const originQuerys = context.query
            const handleMetadatas: any = this.handleMetadatas[bodyMetadata.index] = paramValidator(originQuerys, bodyMetadata)
            const paramtypes = Reflect.getMetadata(MetadataEnums.Metadata.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (Array.isArray(paramtypes)) {
                const Entity = paramtypes[bodyMetadata.index]
                const validations =  Reflect.getMetadata(MetadataEnums.Metadata.VALIDATORS, Entity.prototype)
                if (Array.isArray(validations)) {
                    if (typeof handleMetadatas !== 'object') {
                        throw new TypeError(`Invalid type ${Entity.name}: In module: ${this.Mod.name}, Controller: ${this.Controller.name}, property: ${this.propertyKey}, route: ${this.path}`)
                    }
                    const entity: EasyBootEntity = new Entity()
                    Object.keys(handleMetadatas).forEach((k) => {
                        (entity as any)[k] = handleMetadatas[k]
                    })
                    validations.forEach(({validation, propertyKey}) => {
                        const metatype = Reflect.getMetadata(MetadataEnums.Metadata.TYPE, Entity.prototype, propertyKey);
                        const data = (entity as any).transform(handleMetadatas[propertyKey], new ArgumentMetadata('param', metatype, validation, propertyKey));
                        (entity as any)[propertyKey] = data
                    })
                    this.handleMetadatas[bodyMetadata.index] = entity
                }
            }
        }
    }

    public async parseRequestMetadata(context: Context) {
        const metadata = Reflect.getMetadata(MetadataEnums.Metadata.REQUEST, this.Controller, this.propertyKey)
        if (metadata) {
            const { index } = metadata
            if (typeof index !== 'number') return;
            this.handleMetadatas[index] = context.request
        }
    }

    public async parseResponseMetadata(context: Context) {
        const metadata = Reflect.getMetadata(MetadataEnums.Metadata.RESPONSE, this.Controller, this.propertyKey)
        if (metadata) {
            const { index } = metadata
            if (typeof index !== 'number') return;
            this.handleMetadatas[index] = context.response
        }
    }
}