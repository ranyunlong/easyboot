import { Servlet, Ctor } from '../core/Servlet';
import { ProviderService } from './ProviderService';
import { RouterConfiguration } from '../configurations/RouterConfiguration';
import { Route } from './Route';
import { ServletContext } from '../core/ServletContext';
import { Stack } from './Stack';
export declare class Router {
    application: Servlet;
    configs?: RouterConfiguration;
    routes: Route[];
    providerService: ProviderService;
    constructor(application: Servlet, configs?: RouterConfiguration);
    parseModule(...modules: Ctor[]): void;
    matchRoutes(context: ServletContext): Promise<Stack>;
}
