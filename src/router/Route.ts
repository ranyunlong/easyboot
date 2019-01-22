import { RequestEnum } from '../enums/request.mapping.enum';
import { Key } from 'path-to-regexp';
import * as pathToRegexp from 'path-to-regexp';
import { BASE } from '../constants/metadata.constant';
import { Router } from './Router';
import { Ctor } from '../core/Servlet';

export class Route {
    public path: string;
    public method: RequestEnum.Methods;
    public Module: Ctor;
    public propertyKey: string;
    public regexp: RegExp;
    public keys: Key[]  = [];
    public Controller: Ctor;
    public controllerMapping: {
        path: string;
        method: RequestEnum.Methods;
    }
    constructor(router: Router, options: Route) {
        if (Array.isArray(options) || typeof options !== 'object') return;
        Object.keys(options).forEach((key: keyof Route) => {
            this[key] = options[key]
        })
        this.controllerMapping = Reflect.getMetadata(BASE.CONTROLLER, this.Controller)
        const paths = [this.controllerMapping.path, this.path || this.propertyKey]
        this.regexp = pathToRegexp(('/' + paths.join('/')).replace(/\/{2,}/g, '/'), this.keys, router.configs || {})
    }
}