/**
 * @class Route
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CType } from '../decorators'
import { RegExpOptions, Key } from 'path-to-regexp'
import { MetadataEnums, RequestEnums } from '../enums';
import * as pathToRegexp from 'path-to-regexp'
import { HttpExceptionConstructor, HttpException } from '../core';

export class Route {
    public basePath: string;
    public baseMethod: string;
    public path: string;
    public method: RequestEnums.METHOD;
    public propertyKey: string;
    public pathParamsKeys: Key[] = []
    public regexp: RegExp;
    public routePath: string;
    public statusMessage: string;
    public statusCode: number;
    public exceptionCapture: HttpExceptionConstructor;
    public exception: HttpException;
    public contentType: string;
    constructor(
        public Controller: CType,
        public Module: CType,
        public options: RegExpOptions = {},
        metadata: { path: string; method: RequestEnums.METHOD; propertyKey: string },
    ) {
        const opts = Reflect.getMetadata(MetadataEnums.Controller.CONTROLLER, Controller)
        if (opts) {
            const { method, path } = opts
            this.baseMethod = method
            this.basePath = path
        }
        const { path, method, propertyKey } = metadata
        this.statusMessage = Reflect.getMetadata(MetadataEnums.Controller.STATUS_MESSAGE, Controller, propertyKey)
        this.statusCode = Reflect.getMetadata(MetadataEnums.Controller.STATUS_CODE, Controller, propertyKey)
        this.exceptionCapture = Reflect.getMetadata(MetadataEnums.Controller.EXCEPTION_CAPTURE, Controller, propertyKey)
        this.exception = Reflect.getMetadata(MetadataEnums.Controller.EXCEPTION, Controller, propertyKey)
        this.contentType = Reflect.getMetadata(MetadataEnums.Controller.CONTENT_TYPE, Controller, propertyKey)
        this.path = path
        this.method = method
        this.propertyKey = propertyKey
        this.mergePath()
        this.createRegexp()
    }

    protected mergePath() {
        this.routePath = `/${this.basePath ? this.basePath : '' }/${this.path ? this.path : this.propertyKey}`.replace(/[\/]{2,}/g, '/')
    }

    protected createRegexp() {
        this.regexp = pathToRegexp(this.routePath, this.pathParamsKeys, this.options)
    }
}