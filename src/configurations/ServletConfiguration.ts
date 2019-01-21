import { ServletSSLConfiguration } from './ServletSSLConfiguration';
import { Env } from '../types/index.api';
import { RouterConfiguration } from './RouterConfiguration';
import * as Keygrip from 'keygrip'

/**
 * @class ServletConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export class ServletConfiguration {

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
    public subdomainOffse?: number = 2

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
     * These are passed to KeyGrip, however you may also pass your own KeyGrip instance. For example the following are acceptable:
     *
     * Example
     * ```
     * public keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
     * public keys = ['im a newer secret', 'i like turtle']
     * ```
     */
    public keys?: Keygrip = Keygrip(['esayboot:servlet'], 'sha256')

    /**
     * https config
     */
    public ssl?: ServletSSLConfiguration;

    /**
     * By default outputs all errors to stderr unless silent is true.
     */
    public silent?: boolean;

    /**
     * Http Services
     */
    public Services?: Map<any, any>;

    /**
     * Router config
     */
    public router?: RouterConfiguration;
}