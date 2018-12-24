"use strict";
/**
 * @class Layer
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enums_1 = require("../enums");
const paramValidator_1 = require("../validation/paramValidator");
const entityValidator_1 = require("../validation/entityValidator");
const core_1 = require("../core");
class Layer {
    constructor(route) {
        this.pathParamsKeys = [];
        this.handleMetadatas = [];
        const { Module, method, routePath, regexp, pathParamsKeys, Controller, propertyKey, statusCode, exception, exceptionCapture, statusMessage, contentType } = route;
        this.method = method;
        this.statusMessage = statusMessage;
        this.statusCode = statusCode;
        this.exceptionCapture = exceptionCapture;
        this.exception = exception;
        this.contentType = contentType;
        this.path = routePath;
        this.regexp = regexp;
        this.pathParamsKeys = pathParamsKeys;
        this.propertyKey = propertyKey;
        this.Controller = Controller;
        this.Mod = Module;
    }
    async parseParamMetadata(context) {
        const paramMetadata = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST_PARAM, this.Controller, this.propertyKey);
        if (paramMetadata) {
            const originParams = {};
            const originData = this.regexp.exec(context.path);
            this.pathParamsKeys.forEach((key, index) => {
                originParams[key.name] = originData[index + 1];
            });
            const { rules, validations, key } = paramMetadata;
            const paramtypes = Reflect.getMetadata(enums_1.MetadataEnums.Base.PARAMTYPES, this.Controller.prototype, this.propertyKey);
            if (rules || validations || key) {
                if (Array.isArray(paramtypes))
                    paramMetadata.metaType = paramtypes[paramMetadata.index];
                this.handleMetadatas[paramMetadata.index] = paramValidator_1.paramValidator(originParams, paramMetadata);
            }
            else {
                if (Array.isArray(paramtypes)) {
                    const Entity = paramtypes[paramMetadata.index];
                    const entite = Reflect.getMetadata(enums_1.MetadataEnums.Base.VALIDATORS, Entity);
                    if (entite) {
                        const result = entityValidator_1.entityValidator(Entity, originParams);
                        if (result)
                            this.handleMetadatas[paramMetadata.index] = result;
                    }
                    else {
                        if (typeof Entity === 'function' && Entity !== Object) {
                            if (originParams.constructor !== Entity) {
                                throw new core_1.HttpException({
                                    statusCode: 400,
                                    data: {
                                        msg: `Parameters data expected ${Entity.name}, got ${typeof originParams}.`
                                    }
                                });
                            }
                        }
                        this.handleMetadatas[paramMetadata.index] = originParams;
                    }
                }
            }
        }
    }
    async parseBodyMetadata(bodyParseService, context) {
        const bodyMetadata = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST_BODY, this.Controller, this.propertyKey);
        const fileMetadata = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST_FILE, this.Controller, this.propertyKey);
        if (bodyMetadata) {
            const originBodys = await bodyParseService.parseBody(context);
            if (fileMetadata) {
                const originFiles = await bodyParseService.parseFile(context, fileMetadata);
                if (originFiles) {
                    Object.keys(originFiles).forEach((key) => {
                        originBodys[key] = originFiles[key];
                    });
                }
            }
            const { rules, validations, key } = bodyMetadata;
            const paramtypes = Reflect.getMetadata(enums_1.MetadataEnums.Base.PARAMTYPES, this.Controller.prototype, this.propertyKey);
            if (rules || validations || key) {
                if (Array.isArray(paramtypes))
                    bodyMetadata.metaType = paramtypes[bodyMetadata.index];
                this.handleMetadatas[bodyMetadata.index] = paramValidator_1.paramValidator(originBodys, bodyMetadata);
            }
            else {
                if (Array.isArray(paramtypes)) {
                    const Entity = paramtypes[bodyMetadata.index];
                    const entite = Reflect.getMetadata(enums_1.MetadataEnums.Base.VALIDATORS, Entity);
                    if (entite) {
                        const result = entityValidator_1.entityValidator(Entity, originBodys);
                        if (result)
                            this.handleMetadatas[bodyMetadata.index] = result;
                    }
                    else {
                        if (typeof Entity === 'function' && Entity !== Object) {
                            if (originBodys.constructor !== Entity) {
                                throw new core_1.HttpException({
                                    statusCode: 400,
                                    data: {
                                        msg: `Parameters data expected ${Entity.name}, got ${typeof originBodys}.`
                                    }
                                });
                            }
                        }
                        this.handleMetadatas[bodyMetadata.index] = originBodys;
                    }
                }
            }
        }
    }
    async parseQueryMetadata(context) {
        const queryMetadata = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST_QUERY, this.Controller, this.propertyKey);
        if (queryMetadata) {
            const originQuerys = context.query;
            const { rules, validations, key } = queryMetadata;
            const paramtypes = Reflect.getMetadata(enums_1.MetadataEnums.Base.PARAMTYPES, this.Controller.prototype, this.propertyKey);
            if (rules || validations || key) {
                if (Array.isArray(paramtypes))
                    queryMetadata.metaType = paramtypes[queryMetadata.index];
                this.handleMetadatas[queryMetadata.index] = paramValidator_1.paramValidator(originQuerys, queryMetadata);
            }
            else {
                if (Array.isArray(paramtypes)) {
                    const Entity = paramtypes[queryMetadata.index];
                    const entite = Reflect.getMetadata(enums_1.MetadataEnums.Base.VALIDATORS, Entity);
                    if (entite) {
                        const result = entityValidator_1.entityValidator(Entity, originQuerys);
                        if (result)
                            this.handleMetadatas[queryMetadata.index] = result;
                    }
                    else {
                        if (typeof Entity === 'function' && Entity !== Object) {
                            if (originQuerys.constructor !== Entity) {
                                throw new core_1.HttpException({
                                    statusCode: 400,
                                    data: {
                                        msg: `Parameters data expected ${Entity.name}, got ${typeof originQuerys}.`
                                    }
                                });
                            }
                        }
                        this.handleMetadatas[queryMetadata.index] = originQuerys;
                    }
                }
            }
        }
    }
    async parseRequestMetadata(context) {
        const metadata = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST, this.Controller, this.propertyKey);
        if (metadata) {
            const { index } = metadata;
            if (typeof index !== 'number')
                return;
            this.handleMetadatas[index] = context.request;
        }
    }
    async parseResponseMetadata(context) {
        const metadata = Reflect.getMetadata(enums_1.MetadataEnums.Controller.RESPONSE, this.Controller, this.propertyKey);
        if (metadata) {
            const { index } = metadata;
            if (typeof index !== 'number')
                return;
            this.handleMetadatas[index] = context.response;
        }
    }
    async parseSessionMetadata(context) {
        const metadata = Reflect.getMetadata(enums_1.MetadataEnums.Controller.SESSION, this.Controller, this.propertyKey);
        if (metadata) {
            const { index } = metadata;
            if (typeof index !== 'number')
                return;
            this.handleMetadatas[index] = context.session;
        }
    }
}
exports.Layer = Layer;
