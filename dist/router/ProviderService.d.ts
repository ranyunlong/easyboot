import { Ctor } from '../types/index.api';
import { Router } from './Router';
export declare class ProviderService {
    private router;
    private globalProvide;
    private provides;
    constructor(router: Router);
    register(Module: Ctor): void;
    getProvider(Module: Ctor, Provider: Ctor): object | undefined;
}
