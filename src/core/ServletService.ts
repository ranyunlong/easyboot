import { ServiceMetadata } from './ServiceMetadata';
export abstract class ServletService {
    constructor(
        public type: 'query' | 'body' | 'param' | 'file' | 'session' | 'staic-serve' | 'proxy-serve'
    ) {}
    public onLaunch?(
        metadata: ServiceMetadata
    ): Promise<undefined | false | object>;

    public onBeforeController?(
        metadata: ServiceMetadata
    ): Promise<void>;

    public onAfterController?(
        metadata: ServiceMetadata
    ): Promise<void>;

    public onBeforeDestroy?(
        metadata: ServiceMetadata
    ): Promise<void>;

    public onDestroyed?(
        metadata: ServiceMetadata
    ): Promise<void>;
}

export type ServletServiceType = 'query' | 'body' | 'param' | 'file' | 'session' | 'staic-serve' | 'proxy-serve'