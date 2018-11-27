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
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { Context } from './lib/Context';
import { Response } from './lib/Response';
import { Request } from './lib/Request';
export declare abstract class Core extends EventEmitter {
    options: Options;
    proxy: boolean;
    subdomainOffset: number;
    env: Env;
    silent: boolean;
    keys: string[];
    /**
     * constructor
     */
    constructor(options?: Options);
    /**
     * callback
     * Handler custom http proccess
     */
    callback(): (request: IncomingMessage | Http2ServerRequest, response: ServerResponse | Http2ServerResponse) => void;
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
    protected createContext(req: IncomingMessage | Http2ServerRequest, res: ServerResponse | Http2ServerResponse): Context;
}
export * from './lib/HttpException';
export interface Options {
    port?: number;
    host?: string;
    keys?: string[];
    env?: Env;
    proxy?: boolean;
    subdomainOffset?: number;
    silent?: boolean;
}
export declare type ServerContext = Context;
export declare type ServerResponse = Response;
export declare type ServerRequest = Request;
export declare type Env = 'development' | 'production';
export default Core;
