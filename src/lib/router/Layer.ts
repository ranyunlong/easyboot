/**
 * @class Layer
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import 'reflect-metadata'
import { Route } from './Route';
import { RequestEnums, MetadataEnums } from '../enums';
import { Key } from 'path-to-regexp'
import { CType } from '../decorators';
import { Context } from '../core/Context';
import { paramValidator } from '../validation/paramValidator';
import { BodyParserService } from '../core/BodyParserService';
import { entityValidator } from '../validation/entityValidator';
import { HttpException, HttpExceptionConstructor } from '../core';

export class Layer {
    public readonly method: RequestEnums.METHOD;
    public readonly path: string;
    public readonly propertyKey: string;
    public readonly pathParamsKeys: Key[] = [];
    public readonly regexp: RegExp;
    public readonly Controller: CType;
    public readonly Mod: CType;
    public readonly handleMetadatas: any[] = [];
    public readonly statusCode: number;
    public readonly statusMessage: string;
    public readonly exceptionCapture: HttpExceptionConstructor;
    public readonly exception: HttpException;
    public readonly contentType: string;
    constructor(route: Route) {
        const { Module, method, routePath, regexp, pathParamsKeys, Controller, propertyKey, statusCode, exception, exceptionCapture, statusMessage, contentType } = route
        this.method = method
        this.statusMessage = statusMessage
        this.statusCode = statusCode
        this.exceptionCapture = exceptionCapture
        this.exception = exception
        this.contentType = contentType
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
            const { rules, validations, key } = paramMetadata
            const paramtypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (rules || validations || key) {
                if (Array.isArray(paramtypes)) paramMetadata.metaType = paramtypes[paramMetadata.index]
                this.handleMetadatas[paramMetadata.index] = paramValidator(originParams, paramMetadata)
            } else {
                if (Array.isArray(paramtypes)) {
                    const Entity = paramtypes[paramMetadata.index]
                    const entite =  Reflect.getMetadata(MetadataEnums.Base.VALIDATORS, Entity)
                    if (entite) {
                        const result = entityValidator(Entity, originParams)
                        if (result) this.handleMetadatas[paramMetadata.index] = result
                    } else {
                        if (typeof Entity === 'function' && Entity !== Object) {
                            if (originParams.constructor !== Entity) {
                                throw new HttpException({
                                    statusCode: 400,
                                    data: {
                                        msg: `Parameters data expected ${Entity.name}, got ${typeof originParams}.`
                                    }
                                })
                            }
                        }
                        this.handleMetadatas[paramMetadata.index] = originParams
                    }
                }
            }
        }
    }

    public async parseBodyMetadata(bodyParseService: BodyParserService, context: Context) {
        const bodyMetadata = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_BODY, this.Controller, this.propertyKey)
        const fileMetadata = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_FILE, this.Controller, this.propertyKey)
        if (bodyMetadata) {
            const originBodys = await bodyParseService.parseBody(context)
            if (fileMetadata) {
                const originFiles = await bodyParseService.parseFile(context, fileMetadata)
                if (originFiles) {
                    Object.keys(originFiles).forEach((key) => {
                        originBodys[key] = originFiles[key]
                    })
                }
            }
            const { rules, validations, key } = bodyMetadata
            const paramtypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (rules || validations || key) {
                if (Array.isArray(paramtypes)) bodyMetadata.metaType = paramtypes[bodyMetadata.index]
                this.handleMetadatas[bodyMetadata.index] = paramValidator(originBodys, bodyMetadata)
            } else {
                if (Array.isArray(paramtypes)) {
                    const Entity = paramtypes[bodyMetadata.index]
                    const entite =  Reflect.getMetadata(MetadataEnums.Base.VALIDATORS, Entity)
                    if (entite) {
                        const result = entityValidator(Entity, originBodys)
                        if (result) this.handleMetadatas[bodyMetadata.index] = result
                    } else {
                        if (typeof Entity === 'function' && Entity !== Object) {
                            if (originBodys.constructor !== Entity) {
                                throw new HttpException({
                                    statusCode: 400,
                                    data: {
                                        msg: `Parameters data expected ${Entity.name}, got ${typeof originBodys}.`
                                    }
                                })
                            }
                        }
                        this.handleMetadatas[bodyMetadata.index] = originBodys
                    }
                }
            }
        }
    }

    public async parseQueryMetadata(context: Context) {
        const queryMetadata = Reflect.getMetadata(MetadataEnums.Controller.REQUEST_QUERY, this.Controller, this.propertyKey)
        if (queryMetadata) {
            const originQuerys = context.query
            const { rules, validations, key } = queryMetadata
            const paramtypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, this.Controller.prototype, this.propertyKey)
            if (rules || validations || key) {
                if (Array.isArray(paramtypes)) queryMetadata.metaType = paramtypes[queryMetadata.index]
                this.handleMetadatas[queryMetadata.index] = paramValidator(originQuerys, queryMetadata)
            } else {
                if (Array.isArray(paramtypes)) {
                    const Entity = paramtypes[queryMetadata.index]
                    const entite =  Reflect.getMetadata(MetadataEnums.Base.VALIDATORS, Entity)
                    if (entite) {
                        const result = entityValidator(Entity, originQuerys)
                        if (result) this.handleMetadatas[queryMetadata.index] = result
                    } else {
                        if (typeof Entity === 'function' && Entity !== Object) {
                            if (originQuerys.constructor !== Entity) {
                                throw new HttpException({
                                    statusCode: 400,
                                    data: {
                                        msg: `Parameters data expected ${Entity.name}, got ${typeof originQuerys}.`
                                    }
                                })
                            }
                        }
                        this.handleMetadatas[queryMetadata.index] = originQuerys
                    }
                }
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