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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvdmlkZXJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlci9Qcm92aWRlclNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxzRUFBOEQ7QUFFOUQsTUFBYSxlQUFlO0lBR3hCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRjFCLGtCQUFhLEdBQWlDLElBQUksR0FBRyxFQUFFLENBQUE7UUFDdkQsYUFBUSxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFDL0IsUUFBUSxDQUFDLE1BQVk7UUFDeEIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQywwQkFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUMvRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDMUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWMsRUFBRSxFQUFFO2dCQUNqQyw0QkFBNEI7Z0JBQzVCLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyx3QkFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFBRTtvQkFDbEQsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDaEMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7d0JBQ3RELElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7NEJBQUUsT0FBTzt3QkFDMUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFBO3FCQUNoRDt5QkFBTTt3QkFDSCxNQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO3dCQUNqQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUE7d0JBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQTtxQkFDbEQ7aUJBQ0o7cUJBQU07b0JBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDM0IsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7d0JBQ2pELElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7NEJBQUUsT0FBTzt3QkFDMUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFBO3FCQUNoRDt5QkFBTTt3QkFDSCxNQUFNLGVBQWUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO3dCQUNqQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUE7d0JBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQTtxQkFDN0M7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVNLFdBQVcsQ0FBQyxNQUFZLEVBQUUsUUFBYztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBRTFFLDJCQUEyQjtRQUMzQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3RELElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQzFFO1FBRUQsK0JBQStCO1FBQy9CLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0IsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDakQsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFBRSxPQUFPLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDMUU7SUFDTCxDQUFDO0NBQ0o7QUFqREQsMENBaURDIn0=