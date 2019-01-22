import { RequestEnum } from '../enums/request.mapping.enum';
import { Ctor } from '../types/index.api';
import { Key } from 'path-to-regexp';
import { Router } from './Router';
export declare class Route {
    path: string;
    method: RequestEnum.Methods;
    Module: Ctor;
    propertyKey: string;
    regexp: RegExp;
    keys: Key[];
    Controller: Ctor;
    controllerMapping: {
        path: string;
        method: RequestEnum.Methods;
    };
    constructor(router: Router, options: Route);
}