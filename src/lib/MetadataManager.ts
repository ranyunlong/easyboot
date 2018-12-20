/**
 * @class MetadataManager
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import 'reflect-metadata';
import chalk from 'chalk';
import { CType } from './decorators';
import { EasyBootServlet } from './core';
import { StackTrace } from './StackTrace';
import { MetadataEnums, StackTraceEnums } from './enums';

export class MetadataManager {
    constructor(public application: EasyBootServlet, public rootModule: CType) {
        this.register(rootModule)
    }
    // Register modules
    public modules: Map<CType, RegistedMoudle<any>> = new Map()

    /**
     * register
     * @param token
     * @param parentToken
     * @returns providers
     */
    public register(token: CType, parentToken?: CType) {
        // Check is registed
        if (this.modules.has(token)) return
        let providers: Map<CType, object>;
        let exports: Map<CType, object>;

        // originData
        const services: Map<CType, object> = new Map()
        const originProviders: any[] = this.reflectProviders(token) || []
        const originImports: any[] = this.reflectImports(token) || []
        const originExports: any[] = this.reflectExports(token) || []
        const originControllers: any[] = this.reflectControllers(token) || []
        const moduleMetadata: RegistedMoudle<any> = {}

        // Imports dependencies
        originImports.forEach((iToken) => {
            this.register(iToken)
            if (this.modules.has(iToken)) {
                const Module = this.modules.get(iToken)
                if (Module.exports) {
                    providers = providers || new Map()
                    Module.exports.forEach((service, key) => {
                        providers.set(key, service)
                    })
                }
            }
        })

        // Providers dependencies
        originProviders.forEach((Service) => {
            providers = providers || new Map()
            if (!services.has(Service)) {
                const service = new Service()
                services.set(Service, service)
            }
            providers.set(Service, services.get(Service))
        })

        // Exports dependencies
        originExports.forEach((eToken) => {
            exports = exports || new Map()
            if (this.modules.has(eToken)) {
                const Module = this.modules.get(eToken)
                if (Module.exports) {
                    Module.exports.forEach((service, key) => {
                        exports.set(key, service)
                    })
                }
            } else {
                if (services.has(eToken)) {
                    const service = services.get(eToken)
                    exports.set(eToken, service)
                } else {
                    // throw exception
                }
            }
        })

        if (exports) {
            moduleMetadata.exports = exports
        }

        if (providers) {
            moduleMetadata.providers = providers
        }

        this.modules.set(token, moduleMetadata)

        originControllers.forEach((Controller) => {
            this.application.router.addRoute(token, Controller)
            const paramtypes = this.reflectParamtypes(Controller)
            if (Array.isArray(paramtypes)) {
                paramtypes.forEach((paramtype, index) => {
                    if (typeof paramtype === 'function') {
                        if (!providers || !providers.has(paramtype)) {
                            // show error
                            const error = new StackTrace(`Invalid service, ${chalk.yellowBright(token.name)} no provider ${chalk.yellowBright(paramtype.name)}.`)
                            error.setStackTraceInfo(StackTraceEnums.DECORATOR.CONTROLLER, Controller)
                            const moduleTrace = new StackTrace(`Invalid module, ${chalk.yellowBright(token.name)} no provider ${chalk.yellowBright(paramtype.name)}.`)
                            moduleTrace.setStackTraceInfo(StackTraceEnums.DECORATOR.MODULE, token)
                            const moduleValue = chalk.bgRedBright('providers')
                            const mouduleCode = moduleTrace.getCode(/providers[\s]*\:[\s*][\[]*/)
                            moduleTrace.replace(mouduleCode, mouduleCode.replace('providers', moduleValue))
                            moduleTrace.resetCodeTarget(moduleValue)
                            const originCode = error.getCode(/constructor[\s]*\([\r\n\s\w\@\:\,\$\(\)\'\"\[\]]*\)/)
                            const code = originCode
                            .replace(/constructor[\s]*\(/, '')
                            .replace(/\r\n/g, '')
                            .replace(/\)$/, '')
                            .split(',').map((value) => value.replace(/^[\s]*/, ''))
                            const value1 = chalk.bgRedBright(paramtype.name)
                            const value2 = chalk.bgRedBright(paramtype.name.toLowerCase())
                            if (RegExp(paramtype.name).test(code[index])) {
                                error.replace(originCode, originCode.replace(code[index], code[index].replace(paramtype.name, value1)))
                                error.resetCodeTarget(value1)
                            } else {
                                error.replace(originCode, originCode.replace(code[index], code[index].replace(paramtype.name.toLowerCase(), value2)))
                                error.resetCodeTarget(value2)
                            }
                            throw error.stack += `\n\n${moduleTrace.stack}`
                        }
                    }
                })
            }
        })
    }

    /**
     * queryProviders
     * @param token
     * @param Service
     */
    public queryProviders(token: CType, Service: CType) {
        const metadata = this.modules.get(token)
        if (metadata) {
            if (metadata.providers) {
                return metadata.providers.get(Service)
            }
        }
    }

    /**
     * reflectProviders
     * @param token
     * @returns providers
     */
    public reflectProviders(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Module.PROVIDERS, token)
    }

    /**
     * reflectParamtypes
     * @param token
     */
    public reflectParamtypes(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, token)
    }

    /**
     * reflectImports
     * @param token
     * @returns imports
     */
    public reflectImports(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Module.IMPORTS, token)
    }

    /**
     * reflectControllers
     * @param token
     * @returns controllers
     */
    public reflectControllers(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Module.CONTROLLERS, token)
    }

    /**
     * reflectExports
     * @param token
     * @returns exports
     */
    public reflectExports(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Module.EXPORTS, token)
    }
}

export interface RegistedMoudle<T> {
    imports?: Map<CType, object>;
    providers?: Map<CType, object>;
    exports?: Map<CType, object>;
}
