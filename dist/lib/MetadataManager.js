"use strict";
/**
 * @class MetadataManager
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chalk_1 = require("chalk");
const StackTrace_1 = require("./StackTrace");
const enums_1 = require("./enums");
class MetadataManager {
    constructor(application, rootModule) {
        this.application = application;
        this.rootModule = rootModule;
        // Register modules
        this.modules = new Map();
        this.register(rootModule);
    }
    /**
     * register
     * @param token
     * @param parentToken
     * @returns providers
     */
    register(token, parentToken) {
        // Check is registed
        if (this.modules.has(token))
            return;
        let providers;
        let exports;
        // originData
        const services = new Map();
        const originProviders = this.reflectProviders(token) || [];
        const originImports = this.reflectImports(token) || [];
        const originExports = this.reflectExports(token) || [];
        const originControllers = this.reflectControllers(token) || [];
        const moduleMetadata = {};
        // Imports dependencies
        originImports.forEach((iToken) => {
            this.register(iToken);
            if (this.modules.has(iToken)) {
                const Module = this.modules.get(iToken);
                if (Module.exports) {
                    providers = providers || new Map();
                    Module.exports.forEach((service, key) => {
                        providers.set(key, service);
                    });
                }
            }
        });
        // Providers dependencies
        originProviders.forEach((Service) => {
            providers = providers || new Map();
            if (!services.has(Service)) {
                const service = new Service();
                services.set(Service, service);
            }
            providers.set(Service, services.get(Service));
        });
        // Exports dependencies
        originExports.forEach((eToken) => {
            exports = exports || new Map();
            if (this.modules.has(eToken)) {
                const Module = this.modules.get(eToken);
                if (Module.exports) {
                    Module.exports.forEach((service, key) => {
                        exports.set(key, service);
                    });
                }
            }
            else {
                if (services.has(eToken)) {
                    const service = services.get(eToken);
                    exports.set(eToken, service);
                }
                else {
                    // throw exception
                }
            }
        });
        if (exports) {
            moduleMetadata.exports = exports;
        }
        if (providers) {
            moduleMetadata.providers = providers;
        }
        this.modules.set(token, moduleMetadata);
        originControllers.forEach((Controller) => {
            this.application.router.addRoute(token, Controller);
            const paramtypes = this.reflectParamtypes(Controller);
            if (Array.isArray(paramtypes)) {
                paramtypes.forEach((paramtype, index) => {
                    if (typeof paramtype === 'function') {
                        if (!providers || !providers.has(paramtype)) {
                            // show error
                            const error = new StackTrace_1.StackTrace(`Invalid service, ${chalk_1.default.yellowBright(token.name)} no provider ${chalk_1.default.yellowBright(paramtype.name)}.`);
                            error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.CONTROLLER, Controller);
                            const moduleTrace = new StackTrace_1.StackTrace(`Invalid module, ${chalk_1.default.yellowBright(token.name)} no provider ${chalk_1.default.yellowBright(paramtype.name)}.`);
                            moduleTrace.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.MODULE, token);
                            const moduleValue = chalk_1.default.bgRedBright('providers');
                            const mouduleCode = moduleTrace.getCode(/providers[\s]*\:[\s*][\[]*/);
                            moduleTrace.replace(mouduleCode, mouduleCode.replace('providers', moduleValue));
                            moduleTrace.resetCodeTarget(moduleValue);
                            const originCode = error.getCode(/constructor[\s]*\([\r\n\s\w\@\:\,\$\(\)\'\"\[\]]*\)/);
                            const code = originCode
                                .replace(/constructor[\s]*\(/, '')
                                .replace(/\r\n/g, '')
                                .replace(/\)$/, '')
                                .split(',').map((value) => value.replace(/^[\s]*/, ''));
                            const value1 = chalk_1.default.bgRedBright(paramtype.name);
                            const value2 = chalk_1.default.bgRedBright(paramtype.name.toLowerCase());
                            if (RegExp(paramtype.name).test(code[index])) {
                                error.replace(originCode, originCode.replace(code[index], code[index].replace(paramtype.name, value1)));
                                error.resetCodeTarget(value1);
                            }
                            else {
                                error.replace(originCode, originCode.replace(code[index], code[index].replace(paramtype.name.toLowerCase(), value2)));
                                error.resetCodeTarget(value2);
                            }
                            throw error.stack += `\n\n${moduleTrace.stack}`;
                        }
                    }
                });
            }
        });
    }
    /**
     * queryProviders
     * @param token
     * @param Service
     */
    queryProviders(token, Service) {
        const metadata = this.modules.get(token);
        if (metadata) {
            if (metadata.providers) {
                return metadata.providers.get(Service);
            }
        }
    }
    /**
     * reflectProviders
     * @param token
     * @returns providers
     */
    reflectProviders(token) {
        return Reflect.getMetadata(enums_1.MetadataEnums.Module.PROVIDERS, token);
    }
    /**
     * reflectParamtypes
     * @param token
     */
    reflectParamtypes(token) {
        return Reflect.getMetadata(enums_1.MetadataEnums.Base.PARAMTYPES, token);
    }
    /**
     * reflectImports
     * @param token
     * @returns imports
     */
    reflectImports(token) {
        return Reflect.getMetadata(enums_1.MetadataEnums.Module.IMPORTS, token);
    }
    /**
     * reflectControllers
     * @param token
     * @returns controllers
     */
    reflectControllers(token) {
        return Reflect.getMetadata(enums_1.MetadataEnums.Module.CONTROLLERS, token);
    }
    /**
     * reflectExports
     * @param token
     * @returns exports
     */
    reflectExports(token) {
        return Reflect.getMetadata(enums_1.MetadataEnums.Module.EXPORTS, token);
    }
}
exports.MetadataManager = MetadataManager;
