import { Ctor } from '../types/index.api';
import { Router } from './Router';
import { MODULE } from '../constants/metadata.constant';

export class ProviderService {
    private globalProvide: Map<Ctor, Map<Ctor, object>> = new Map()
    private provides: Map<Ctor, Map<Ctor, object>> = new Map()
    constructor(private router: Router) {}
    public register(Module: Ctor) {
        const providers = Reflect.getMetadata(MODULE.PROVIDERS, Module)
        if (Array.isArray(providers)) {
            providers.forEach((Provider: Ctor) => {
                // Check is global providers
                if (Reflect.getMetadata(MODULE.GLOBAL, Module)) {
                    if (this.globalProvide.has(Module)) {
                        const mappingProvider = this.globalProvide.get(Module)
                        if (mappingProvider.has(Provider)) return;
                        mappingProvider.set(Provider, new Provider())
                    } else {
                        const mappingProvider = new Map()
                        mappingProvider.set(Provider, new Provider())
                        this.globalProvide.set(Module, mappingProvider)
                    }
                } else {
                    if (this.provides.has(Module)) {
                        const mappingProvider = this.provides.get(Module)
                        if (mappingProvider.has(Provider)) return;
                        mappingProvider.set(Provider, new Provider())
                    } else {
                        const mappingProvider = new Map()
                        mappingProvider.set(Provider, new Provider())
                        this.provides.set(Module, mappingProvider)
                    }
                }
            })
        }
    }

    public getProvider(Module: Ctor, Provider: Ctor): object | undefined {
        if (!this.provides.has(Module) && !this.globalProvide.has(Module)) return;

        // Mapping global providers
        if (this.globalProvide.has(Module)) {
            const mappingProvider = this.globalProvide.get(Module)
            if (mappingProvider.has(Provider)) return mappingProvider.get(Provider)
        }

        // Mapping this scope providers
        if (this.provides.has(Module)) {
            const mappingProvider = this.provides.get(Module)
            if (mappingProvider.has(Provider)) return mappingProvider.get(Provider)
        }
    }
}