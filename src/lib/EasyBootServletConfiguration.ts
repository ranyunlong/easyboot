/**
 * @class EasyBootServletConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Env } from './core/EasyBootServlet'
import { ServerOptions } from 'https'
import { RegExpOptions } from 'path-to-regexp'

export class EasyBootServletConfiguration {
    // Server http port config
    public port?: number = 3000

    // Server http host config
    public host?: string = 'localhost'

    // Server keys config
    public keys?: string[] = []

    // Server https config
    public ssl?: ServerOptions;

    // Server env mode config
    public env?: Env = 'development'

    // Server proxy config
    public proxy?: boolean;

    // Server subdomainOffset config
    public subdomainOffset?: number = 2

    // Server silent config
    public silent?: boolean;

    // Server router RegExp config
    public router?: RegExpOptions;
}