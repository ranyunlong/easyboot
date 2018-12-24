"use strict";
/**
 * @class Route
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const pathToRegexp = require("path-to-regexp");
const enums_1 = require("../enums");
class Route {
    constructor(Controller, Module, options = {}, metadata) {
        this.Controller = Controller;
        this.Module = Module;
        this.options = options;
        this.pathParamsKeys = [];
        const opts = Reflect.getMetadata(enums_1.MetadataEnums.Controller.CONTROLLER, Controller);
        if (opts) {
            const { method, path } = opts;
            this.baseMethod = method;
            this.basePath = path;
        }
        const { path, method, propertyKey } = metadata;
        this.statusMessage = Reflect.getMetadata(enums_1.MetadataEnums.Controller.STATUS_MESSAGE, Controller, propertyKey);
        this.statusCode = Reflect.getMetadata(enums_1.MetadataEnums.Controller.STATUS_CODE, Controller, propertyKey);
        this.exceptionCapture = Reflect.getMetadata(enums_1.MetadataEnums.Controller.EXCEPTION_CAPTURE, Controller, propertyKey);
        this.exception = Reflect.getMetadata(enums_1.MetadataEnums.Controller.EXCEPTION, Controller, propertyKey);
        this.contentType = Reflect.getMetadata(enums_1.MetadataEnums.Controller.CONTENT_TYPE, Controller, propertyKey);
        this.path = path;
        this.method = method;
        this.propertyKey = propertyKey;
        this.mergePath();
        this.createRegexp();
    }
    mergePath() {
        this.routePath = `/${this.basePath ? this.basePath : ''}/${this.path ? this.path : this.propertyKey}`.replace(/[\/]{2,}/g, '/');
    }
    createRegexp() {
        this.regexp = pathToRegexp(this.routePath, this.pathParamsKeys, this.options);
    }
}
exports.Route = Route;
