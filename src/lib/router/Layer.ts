import { Route } from './Route';
import { RequestElementTypes, MetadataElementTypes } from '../enums';
import { Key } from 'path-to-regexp'
import { CType } from '../decorators';
import { Context } from '../core/Context';
import { paramValidator } from '../validation/paramValidator';
import { ArgumentMetadata } from '../ArgumentMetadata';
import { EasyBootEntity } from '../EasyBootEntity';
import { BodyParserService } from '../core/BodyParserService';
export class Layer {
    public readonly method: RequestElementTypes.METHOD;
    public readonly path: string;
    public readonly propertyKey: string;
    public readonly pathParamsKeys: Key[] = [];
    public readonly regexp: RegExp;
    public readonly Controller: CType;
    public readonly Mod: CType;
    public readonly handleMetadatas: any[] = [];
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

    public async parseParam(context: Context) {
        const paramMetadata = Reflect.getMetadata(MetadataElementTypes.Metadata.REQUEST_PARAM, this.Controller, this.propertyKey)
        if (paramMetadata) {
            const originParams: any = {}
            const originData = this.regexp.exec(context.path)
            this.pathParamsKeys.forEach((key, index) => {
                originParams[key.name] = originData[index + 1]
            })
            const handleMetadatas: any = this.handleMetadatas[paramMetadata.index] = paramValidator(originParams, paramMetadata)
            const paramtypes = Reflect.getMetadata(MetadataElementTypes.Metadata.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (Array.isArray(paramtypes)) {
                const Entity = paramtypes[paramMetadata.index]
                const validations =  Reflect.getMetadata(MetadataElementTypes.Metadata.VALIDATORS, Entity.prototype)
                if (Array.isArray(validations)) {
                    if (typeof handleMetadatas !== 'object') {
                        throw new TypeError(`Invalid type ${Entity.name}: In module: ${this.Mod.name}, Controller: ${this.Controller.name}, property: ${this.propertyKey}, route: ${this.path}`)
                    }
                    const entity: EasyBootEntity = new Entity()
                    Object.keys(handleMetadatas).forEach((k) => {
                        (entity as any)[k] = handleMetadatas[k]
                    })
                    validations.forEach(({validation, propertyKey}) => {
                        const metatype = Reflect.getMetadata(MetadataElementTypes.Metadata.TYPE, Entity.prototype, propertyKey);
                        const data = (entity as any).transform(handleMetadatas[propertyKey], new ArgumentMetadata('param', metatype, validation, propertyKey));
                        (entity as any)[propertyKey] = data
                    })
                    this.handleMetadatas[paramMetadata.index] = entity
                }
            }
        }
    }

    public async parseBody(bodyParseService: BodyParserService, context: Context) {
        const bodyMetadata = Reflect.getMetadata(MetadataElementTypes.Metadata.REQUEST_BODY, this.Controller, this.propertyKey)
        if (bodyMetadata) {
            const originBodys = await bodyParseService.parseBody(context)
            const handleMetadatas: any = this.handleMetadatas[bodyMetadata.index] = paramValidator(originBodys, bodyMetadata)
            const paramtypes = Reflect.getMetadata(MetadataElementTypes.Metadata.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (Array.isArray(paramtypes)) {
                const Entity = paramtypes[bodyMetadata.index]
                const validations =  Reflect.getMetadata(MetadataElementTypes.Metadata.VALIDATORS, Entity.prototype)
                if (Array.isArray(validations)) {
                    if (typeof handleMetadatas !== 'object') {
                        throw new TypeError(`Invalid type ${Entity.name}: In module: ${this.Mod.name}, Controller: ${this.Controller.name}, property: ${this.propertyKey}, route: ${this.path}`)
                    }
                    const entity: EasyBootEntity = new Entity()
                    Object.keys(handleMetadatas).forEach((k) => {
                        (entity as any)[k] = handleMetadatas[k]
                    })
                    validations.forEach(({validation, propertyKey}) => {
                        const metatype = Reflect.getMetadata(MetadataElementTypes.Metadata.TYPE, Entity.prototype, propertyKey);
                        const data = (entity as any).transform(handleMetadatas[propertyKey], new ArgumentMetadata('param', metatype, validation, propertyKey));
                        (entity as any)[propertyKey] = data
                    })
                    this.handleMetadatas[bodyMetadata.index] = entity
                }
            }
        }
    }

    public async parseQuery(context: Context) {
        const bodyMetadata = Reflect.getMetadata(MetadataElementTypes.Metadata.REQUEST_QUERY, this.Controller, this.propertyKey)
        if (bodyMetadata) {
            const originQuerys = context.query
            const handleMetadatas: any = this.handleMetadatas[bodyMetadata.index] = paramValidator(originQuerys, bodyMetadata)
            const paramtypes = Reflect.getMetadata(MetadataElementTypes.Metadata.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (Array.isArray(paramtypes)) {
                const Entity = paramtypes[bodyMetadata.index]
                const validations =  Reflect.getMetadata(MetadataElementTypes.Metadata.VALIDATORS, Entity.prototype)
                if (Array.isArray(validations)) {
                    if (typeof handleMetadatas !== 'object') {
                        throw new TypeError(`Invalid type ${Entity.name}: In module: ${this.Mod.name}, Controller: ${this.Controller.name}, property: ${this.propertyKey}, route: ${this.path}`)
                    }
                    const entity: EasyBootEntity = new Entity()
                    Object.keys(handleMetadatas).forEach((k) => {
                        (entity as any)[k] = handleMetadatas[k]
                    })
                    validations.forEach(({validation, propertyKey}) => {
                        const metatype = Reflect.getMetadata(MetadataElementTypes.Metadata.TYPE, Entity.prototype, propertyKey);
                        const data = (entity as any).transform(handleMetadatas[propertyKey], new ArgumentMetadata('param', metatype, validation, propertyKey));
                        (entity as any)[propertyKey] = data
                    })
                    this.handleMetadatas[bodyMetadata.index] = entity
                }
            }
        }
    }
}