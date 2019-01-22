/**
 * @class Servlet
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
/// <reference types="node" />
import * as Keygrip from 'keygrip';
import * as EventEmitter from 'events';
import { ListenOptions } from 'net';
import { ServletConfiguration } from '../configurations/ServletConfiguration';
import { Router } from '../router/Router';
import { ServletService, ServletServiceType } from './ServletService';
export declare class Servlet extends EventEmitter {
    private options?;
    proxy: boolean;
    subdomainOffset: number;
    env: Env;
    keys: string[] | Keygrip;
    silent: boolean;
    router: Router;
    providers: Map<ServletServiceType, ServletService>;
    constructor(options?: ServletConfiguration);
    bootstrap?(): void;
    /**
     * start reponse
     */
    private start;
    /**
     * respond
     * Application respond
     */
    private respond;
    /**
     * createContext
     * Server context create method
     */
    private createContext;
    /**
     * exception
     * Exception handler method
     */
    private exception;
    /**
     * listen
     * Http listen method
     */
    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: Function): this;
    listen(port?: number, hostname?: string, listeningListener?: Function): this;
    listen(port?: number, backlog?: number, listeningListener?: Function): this;
    listen(port?: number, listeningListener?: Function): this;
    listen(path: string, backlog?: number, listeningListener?: Function): this;
    listen(path: string, listeningListener?: Function): this;
    listen(options: ListenOptions, listeningListener?: Function): this;
    listen(handle: any, backlog?: number, listeningListener?: Function): this;
    listen(handle: any, listeningListener?: Function): this;
    /**
     * registerProvider
     */
    registerProvider(service: ServletService): void;
    /**
     * registerModule
     */
    registerModule(...modules: Ctor[]): void;
}
export interface Ctor {
    new (...args: any): any;
}
export declare type Env = 'development' | 'production';
export interface Modules {
    [key: string]: Ctor;
}
