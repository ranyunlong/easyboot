"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
function Module(config) {
    return (target) => {
        const options = target.prototype;
        options.$controllers = config.controllers || [];
        options.$providers = config.providers || [];
        options.$entity = config.entity || [];
        options.$configs = config.configs || [];
    };
}
exports.Module = Module;
function Modules(modules) {
    return (target) => {
        const options = target.prototype;
        options.$modules = modules;
    };
}
exports.Modules = Modules;
//# sourceMappingURL=Module.js.map