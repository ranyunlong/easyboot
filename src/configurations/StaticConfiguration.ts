/**
 * @class StaticConfiguration
 */

import { ServerResponse } from 'http';
import * as fs from 'fs'

export class StaticConfiguration {
    constructor(configuration?: StaticConfiguration) {
        if (typeof configuration !== 'object' || Array.isArray(configuration)) return;
        Object.keys(configuration).forEach((key: keyof StaticConfiguration) => {
            this[key] = configuration[key]
        })
    }

    /**
     * Root directory to restrict file access.
     */
    public root: string;

    /**
     * If true, in controler after response.
     */
    public defer?: boolean = false;

    /**
     * Default file name, defaults to 'index.html'
     */
    public index?: string | boolean = 'index.html';

    /**
     * maxage Browser cache max-age in milliseconds. defaults to 0
     */
    public maxage?: number = 0;

    /**
     * maxage Browser cache max-age in milliseconds. defaults to 0
     */
    public maxAge?: number = 0;

    /**
     * Tell the browser the resource is immutable and can be cached indefinitely. (defaults to false)
     */
    public immutable?: boolean = false;

    /**
     * Allow transfer of hidden files. (defaults to false)
     */
    public hidden?: boolean = false;

    /**
     * If not false (defaults to true),
     * format the path to serve static file servers and not require a trailing slash for directories,
     * so that you can do both /directory and /directory/.
     */
    public format?: boolean = true;

    /**
     * Try to match extensions from passed array to search for file when no extension is sufficed in URL.
     * First found is served. (defaults to false)
     */
    public extensions?: any | any[] = false;

    /**
     * Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists. (defaults to true).
     */
    public brotli?: boolean = true;

    /**
     * Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists.
     * defaults to true.
     */
    public gzip?: boolean = true;

    /**
     * Function to set custom headers on response.
     */
    public setHeaders?: (res: ServerResponse, path: string, stats: fs.Stats) => void;
}