/**
 * @class Core
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
/// <reference types="node" />
import 'reflect-metadata';
import * as EventEmitter from 'events';
import { ListenOptions } from 'net';
import { IncomingMessage, ServerResponse } from 'http';
import { Context } from './Context';
import { HttpException } from './HttpException';
import { Router } from '../router';
import { ServletConfiguration } from '../configurations';
import { MetadataManager } from '../MetadataManager';
import { BodyParserService } from './services/BodyParserService';
import { SessionService } from './services/SessionService';
import { StaticService } from './services/StaticService';
import { ProxyService } from './services/ProxyService';
export declare abstract class EasyBootServlet extends EventEmitter {
    configs: ServletConfiguration;
    readonly proxy: boolean;
    readonly subdomainOffset: number;
    readonly env: Env;
    readonly silent: boolean;
    readonly keys: string[];
    readonly router: Router;
    readonly metadataManager: MetadataManager;
    readonly bodyParserService: BodyParserService;
    readonly sessionService: SessionService;
    readonly staticService: StaticService;
    readonly proxyService: ProxyService;
    /**
     * constructor
     */
    constructor(configs?: ServletConfiguration);
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
    run?(context: Context): Promise<void>;
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
    exception(context: Context, error: HttpException): void;
    /**
     * createContext
     * Server context create method
     */
    protected createContext(req: IncomingMessage, res: ServerResponse): Context;
}
export declare type Env = 'development' | 'production';
export default EasyBootServlet;
