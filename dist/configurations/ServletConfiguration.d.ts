import { ServletSSLConfiguration } from './ServletSSLConfiguration';
import { Env } from '../types/index.api';
import { RouterConfiguration } from './RouterConfiguration';
import * as Keygrip from 'keygrip';
/**
 * @class ServletConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export declare class ServletConfiguration {
    /**
     * defaulting to the NODE_ENV or "development"
     */
    env?: Env;
    /**
     * when true proxy header fields will be trusted
     */
    proxy?: boolean;
    /**
     * offset of .subdomains to ignore [2]
     */
    subdomainOffse?: number;
    /**
     * Server http port config
     */
    port?: number;
    /**
     * Server http host
     */
    host?: string;
    /**
     * Set signed cookie keys.
     * These are passed to KeyGrip, however you may also pass your own KeyGrip instance. For example the following are acceptable:
     *
     * Example
     * ```
     * public keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
     * public keys = ['im a newer secret', 'i like turtle']
     * ```
     */
    keys?: string[] | Keygrip;
    /**
     * https config
     */
    ssl?: ServletSSLConfiguration;
    /**
     * By default outputs all errors to stderr unless silent is true.
     */
    silent?: boolean;
    /**
     * Router config
     */
    router?: RouterConfiguration;
    /**
     * public static dir
     */
    staticDir?: string;
}
