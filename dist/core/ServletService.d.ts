import { ServiceMetadata } from './ServiceMetadata';
export declare abstract class ServletService {
    type: ServletServiceType;
    constructor(type: ServletServiceType);
    onLaunch?(metadata: ServiceMetadata): Promise<undefined | false | object>;
    onBeforeController?(metadata: ServiceMetadata): Promise<void>;
    onAfterController?(metadata: ServiceMetadata): Promise<void>;
    onBeforeDestroy?(metadata: ServiceMetadata): Promise<void>;
    onDestroyed?(metadata: ServiceMetadata): Promise<void>;
}
export declare type ServletServiceType = 'query' | 'body' | 'param' | 'file' | 'session' | 'staic-serve' | 'proxy-serve';
