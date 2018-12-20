/**
 * @class ServletConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Env } from './core';
import { ServerOptions } from 'https';
import { RegExpOptions } from 'path-to-regexp';
import { BodyParserService } from './core/BodyParserService';

export class ServletConfiguration {
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
    public router?: RegExpOptions = {}

    // Server body parse config;
    public bodyparse?: BodyParserService.Options = {}
}