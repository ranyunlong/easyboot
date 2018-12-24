/**
 * @class ServletConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
/// <reference types="node" />
import { Env } from '../core';
import { ServerOptions } from 'https';
import { RouterConfiguration } from './RouterConfiguration';
import { BodyParseConfiguration } from './BodyParseConfiguration';
import { SessionConfiguration } from './SessionConfiguration';
import { StaticConfiguration } from './StaticConfiguration';
import { ProxyTable } from '../core/services/ProxyService';
export declare class ServletConfiguration {
    port?: number;
    host?: string;
    keys?: string[];
    ssl?: ServerOptions;
    env?: Env;
    proxy?: boolean;
    subdomainOffset?: number;
    silent?: boolean;
    router?: RouterConfiguration;
    bodyConfig?: BodyParseConfiguration;
    sessionConfig?: SessionConfiguration;
    staticConfig?: StaticConfiguration;
    proxyTable?: ProxyTable;
}
