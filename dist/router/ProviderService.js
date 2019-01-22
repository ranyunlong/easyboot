"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
class ProviderService {
    constructor(router) {
        this.router = router;
        this.globalProvide = new Map();
        this.provides = new Map();
    }
    register(Module) {
        const providers = Reflect.getMetadata(metadata_constant_1.MODULE.PROVIDERS, Module);
        if (Array.isArray(providers)) {
            providers.forEach((Provider) => {
                // Check is global providers
                if (Reflect.getMetadata(metadata_constant_1.BASE.GLOBAL_SERVICE, Module)) {
                    if (this.globalProvide.has(Module)) {
                        const mappingProvider = this.globalProvide.get(Module);
                        if (mappingProvider.has(Provider))
                            return;
                        mappingProvider.set(Provider, new Provider());
                    }
                    else {
                        const mappingProvider = new Map();
                        mappingProvider.set(Provider, new Provider());
                        this.globalProvide.set(Module, mappingProvider);
                    }
                }
                else {
                    if (this.provides.has(Module)) {
                        const mappingProvider = this.provides.get(Module);
                        if (mappingProvider.has(Provider))
                            return;
                        mappingProvider.set(Provider, new Provider());
                    }
                    else {
                        const mappingProvider = new Map();
                        mappingProvider.set(Provider, new Provider());
                        this.provides.set(Module, mappingProvider);
                    }
                }
            });
        }
    }
    getProvider(Module, Provider) {
        if (!this.provides.has(Module) && !this.globalProvide.has(Module))
            return;
        // Mapping global providers
        if (this.globalProvide.has(Module)) {
            const mappingProvider = this.globalProvide.get(Module);
            if (mappingProvider.has(Provider))
                return mappingProvider.get(Provider);
        }
        // Mapping this scope providers
        if (this.provides.has(Module)) {
            const mappingProvider = this.provides.get(Module);
            if (mappingProvider.has(Provider))
                return mappingProvider.get(Provider);
        }
    }
}
exports.ProviderService = ProviderService;
//# sourceMappingURL=ProviderService.js.map