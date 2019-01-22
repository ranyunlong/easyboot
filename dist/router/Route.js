"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathToRegexp = require("path-to-regexp");
const metadata_constant_1 = require("../constants/metadata.constant");
class Route {
    constructor(router, options) {
        this.keys = [];
        if (Array.isArray(options) || typeof options !== 'object')
            return;
        Object.keys(options).forEach((key) => {
            this[key] = options[key];
        });
        this.controllerMapping = Reflect.getMetadata(metadata_constant_1.BASE.CONTROLLER, this.Controller);
        const paths = [this.controllerMapping.path, this.path || this.propertyKey];
        this.regexp = pathToRegexp('/' + paths.join('/').replace(/\/{2,}/, '/'), this.keys, router.configs || {});
    }
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map