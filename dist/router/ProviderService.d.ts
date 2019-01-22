import { Router } from './Router';
import { Ctor } from '../core/Servlet';
export declare class ProviderService {
    private router;
    private globalProvide;
    private provides;
    constructor(router: Router);
    register(Module: Ctor): void;
    getProvider(Module: Ctor, Provider: Ctor): object | undefined;
}
