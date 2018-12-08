/**
 * @class EasyBootMetadataManager
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CType } from './decorators';
import { MetadataElementTypes } from './enums';

export class EasyBootMetadataManager {
    // Register services
    public services: Map<CType, RegistedMoudle<any>> = new Map()

    /**
     * register
     * @param token
     * @param parentToken
     * @returns providers
     */
    public register(token: CType, parentToken?: CType) {
        // Check is registed
        if (this.services.has(token)) return;
        let providers = this.reflectProviders(token)
        let imports = this.reflectImports(token)
        let components = this.reflectComponents(token)
        let exports = this.reflectExports(token)
        let modules = this.reflectModules(token)
        const moduleMetadata: RegistedMoudle<any> = {}
        this.services.set(token, moduleMetadata)
        const registed: any[] = []
        // Provide dependencies
        if (Array.isArray(providers)) {
            providers = providers.map((Service) => {
                const service = new Service()
                registed.push(service)
                return service
            })
            moduleMetadata.providers = providers
        }

        // Export dependencies
        if (Array.isArray(exports)) {
            exports = exports.map((Service) => {
                const find = registed.find((service) => service instanceof Service)
                if (find) return find
                return new Service()
            })
            moduleMetadata.exports = exports
        }

        // Import dependencies
        if (Array.isArray(imports)) {
            imports.forEach((tok) => {
                if (this.services.has(tok)) {
                    const ipts = this.services.get(tok)
                    if (Array.isArray(providers)) {
                        providers.push(...ipts.exports)
                    } else {
                        providers = []
                        providers.push(...ipts.exports)
                    }
                } else {
                    this.register(tok)
                    const ipts = this.services.get(tok)
                    providers.push(...ipts.exports)
                }
            })
            moduleMetadata.imports = imports
            moduleMetadata.providers = providers
        }

        // Merge Parent providers
        if (parentToken) {
            const parent = this.services.get(parentToken) || {}
            if (Array.isArray(parent.providers)) {
                if (Array.isArray(providers)) providers.push(...parent.providers)
                providers = parent.providers
            }
        }

        // modules
        if (Array.isArray(modules)) {
            modules.forEach((Mod) => {
                if (!this.services.has(Mod)) this.register(Mod, token)
            })
            moduleMetadata.modules = modules
        }

        // Components
        if (Array.isArray(components)) {
            moduleMetadata.components = components
        }
    }

    /**
     * queryProviders
     * @param token
     * @param Service
     */
    public queryProviders(token: CType, Service: CType) {
       const metadata = this.services.get(token)
       return metadata.providers.find((service) => service instanceof Service)
    }

    /**
     * reflectImports
     * @param token
     * @returns providers
     */
    public reflectProviders(token: CType) {
        return Reflect.getMetadata(MetadataElementTypes.Metadata.PROVIDERS, token)
    }

    /**
     * reflectImports
     * @param token
     * @returns imports
     */
    public reflectImports(token: CType) {
        return Reflect.getMetadata(MetadataElementTypes.Metadata.IMPORTS, token)
    }

    /**
     * reflectComponents
     * @param token
     * @returns components
     */
    public reflectComponents(token: CType) {
        return Reflect.getMetadata(MetadataElementTypes.Metadata.COMPONENTS, token)
    }

    /**
     * reflectExports
     * @param token
     * @returns exports
     */
    public reflectExports(token: CType) {
        return Reflect.getMetadata(MetadataElementTypes.Metadata.EXPORTS, token)
    }

    /**
     * reflectModules
     * @param token
     * @returns modules
     */
    public reflectModules(token: CType) {
        return Reflect.getMetadata(MetadataElementTypes.Metadata.MODULES, token)
    }
}

export interface RegistedMoudle<T> {
    imports?: T[];
    controllers?: T[];
    providers?: T[];
    exports?: T[];
    modules?: T[];
    components?: T[];
}
