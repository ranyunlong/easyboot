/**
 * @class EasyBootMetadataManager
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CType } from './decorators';
import { MetadataEnums } from './enums';
import { EasyBootServlet } from './core';
import chalk from 'chalk';

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
                    const exception = this.refllectExceptionTrace(token)
                    exception.setMessage(`Invalid Service ${chalk.yellowBright(eToken.name)}, not in providers.`)
                    exception.highlight(eToken.name)
                    throw exception
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
                paramtypes.forEach((paramtype) => {
                    if (typeof paramtype === 'function') {
                        if (!providers) {
                            // show error
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
        return Reflect.getMetadata(MetadataEnums.Metadata.PROVIDERS, token)
    }

    /**
     * reflectParamtypes
     * @param token
     */
    public reflectParamtypes(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Metadata.PARAMTYPES, token)
    }

    /**
     * refllectExceptionTrace
     * @param token
     */
    public refllectExceptionTrace(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Metadata.EXCEPTION_TRACE, token)
    }

    /**
     * reflectImports
     * @param token
     * @returns imports
     */
    public reflectImports(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Metadata.IMPORTS, token)
    }

    /**
     * reflectControllers
     * @param token
     * @returns controllers
     */
    public reflectControllers(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Metadata.CONTROLLERS, token)
    }

    /**
     * reflectExports
     * @param token
     * @returns exports
     */
    public reflectExports(token: CType) {
        return Reflect.getMetadata(MetadataEnums.Metadata.EXPORTS, token)
    }
}

export interface RegistedMoudle<T> {
    imports?: Map<CType, object>;
    providers?: Map<CType, object>;
    exports?: Map<CType, object>;
}
