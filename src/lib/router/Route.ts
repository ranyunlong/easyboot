import { CType } from '../decorators'
import { RegExpOptions, Key } from 'path-to-regexp'
import { MetadataElementTypes, RequestElementTypes } from '../enums';
import * as pathToRegexp from 'path-to-regexp'
export class Route {
    public basePath: string;
    public baseMethod: string;
    public path: string;
    public method: RequestElementTypes.METHOD;
    public propertyKey: string;
    public pathParamsKeys: Key[] = []
    public regexp: RegExp;
    public routePath: string;
    constructor(
        public Controller: CType,
        public Module: CType,
        public options: RegExpOptions = {},
        metadata: { path: string; method: RequestElementTypes.METHOD; propertyKey: string },
    ) {
        const opts = Reflect.getMetadata(MetadataElementTypes.Metadata.CONTROLLER, Controller)
        if (opts) {
            const { method, path } = opts
            this.baseMethod = method
            this.basePath = path
        }
        const { path, method, propertyKey } = metadata
        this.path = path
        this.method = method
        this.propertyKey = propertyKey
        this.mergePath()
        this.createRegexp()
    }

    protected mergePath() {
        this.routePath = `/${this.basePath}/${this.path}`.replace(/[\/]{2,}/g, '/')
    }

    protected createRegexp() {
        this.regexp = pathToRegexp(this.routePath, this.pathParamsKeys, this.options)
    }
}