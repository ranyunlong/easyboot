/**
 * @class Core
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
/// <reference types="node" />
import * as EventEmitter from 'events';
import { ListenOptions } from 'net';
import { IncomingMessage, ServerResponse } from 'http';
import { ServerOptions } from 'https';
import { Context } from './lib/Context';
export declare abstract class EasyBootServlet extends EventEmitter {
    configs: Options;
    proxy: boolean;
    subdomainOffset: number;
    env: Env;
    silent: boolean;
    keys: string[];
    /**
     * constructor
     */
    constructor(configs?: Options);
    /**
     * callback
     * Handler custom http proccess
     */
    callback(): (request: IncomingMessage, response: ServerResponse) => void;
    /**
     * listen
     * Http listen method
     */
    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): this;
    listen(port: number, hostname?: string, listeningListener?: () => void): this;
    listen(port: number, backlog?: number, listeningListener?: () => void): this;
    listen(port: number, listeningListener?: () => void): this;
    listen(path: string, backlog?: number, listeningListener?: () => void): this;
    listen(path: string, listeningListener?: () => void): this;
    listen(options: ListenOptions, listeningListener?: () => void): this;
    listen(handle: any, backlog?: number, listeningListener?: () => void): this;
    listen(handle: any, listeningListener?: () => void): this;
    abstract response(context: Context): Promise<void>;
    /**
     * start
     * Application start method
     */
    private start;
    /**
     * respond
     * Application respond
     */
    private respond;
    /**
     * exception
     * Exception handler method
     */
    private exception;
    /**
     * createContext
     * Server context create method
     */
    protected createContext(req: IncomingMessage, res: ServerResponse): Context;
}
export * from './lib/HttpException';
export * from './lib/Context';
export * from './lib/Request';
export * from './lib/Response';
export * from './lib/Module';
export * from './lib/Router';
export * from './lib/Controller';
export interface Options {
    port?: number;
    host?: string;
    keys?: string[];
    ssl?: ServerOptions;
    env?: Env;
    proxy?: boolean;
    subdomainOffset?: number;
    silent?: boolean;
}
export declare type Env = 'development' | 'production';
export default EasyBootServlet;
