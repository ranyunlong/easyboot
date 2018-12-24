/**
 * @class ServletConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { Env } from '../core';
import { ServerOptions } from 'https';
import { RouterConfiguration } from './RouterConfiguration';
import { BodyParseConfiguration } from './BodyParseConfiguration';
import { SessionConfiguration } from './SessionConfiguration';
import { StaticConfiguration } from './StaticConfiguration';
import { ProxyTable } from '../core/services/ProxyService';

export class ServletConfiguration {
    /**
     * Server http port config
     */
    public port?: number = 3000

    /**
     * Server http host
     */
    public host?: string = 'localhost'

    /**
     * Set signed cookie keys.
     */
    public keys?: string[] = ['easyboot:sess']

    // Server https config
    public ssl?: ServerOptions;

    /**
     * defaulting to the NODE_ENV or "development"
     */
    public env?: Env = 'development'

    /**
     * when true proxy header fields will be trusted
     */
    public proxy?: boolean;

    /**
     * offset of .subdomains to ignore [2]
     */
    public subdomainOffset?: number = 2

    /**
     * Server router config
     */
    public router?: RouterConfiguration = new RouterConfiguration()

    /**
     * Server body parse config;
     */
    public bodyConfig?: BodyParseConfiguration = new BodyParseConfiguration()

    /**
     * By default outputs all errors to stderr unless silent is true.
     */
    public silent: boolean;

    /**
     * Server session config
     */
    public sessionConfig?: SessionConfiguration = new SessionConfiguration()

    /**
     * Server static config
     */
    public staticConfig?: StaticConfiguration;

    /**
     * Server proxy config
     */
    public proxyTable?: ProxyTable;
}