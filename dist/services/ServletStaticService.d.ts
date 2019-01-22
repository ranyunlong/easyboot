/**
 * @class ServletStaticService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
/// <reference types="node" />
import { ServletService } from '../core/ServletService';
import { ServiceMetadata } from '../core/ServiceMetadata';
import { ServerResponse } from 'http';
import * as fs from 'fs';
export declare class ServletStaticService extends ServletService {
    options: StaticOptions;
    constructor(options: StaticOptions);
    onBeforeController(metadata: ServiceMetadata): Promise<void>;
    onAfterController(metadata: ServiceMetadata): Promise<void>;
}
export interface StaticOptions {
    /**
     * Root directory to restrict file access.
     */
    root: string;
    /**
     * If true, in controler after response.
     */
    defer?: boolean;
    /**
     * Default file name, defaults to 'index.html'
     */
    index?: string | boolean;
    /**
     * maxage Browser cache max-age in milliseconds. defaults to 0
     */
    maxage?: number;
    /**
     * maxage Browser cache max-age in milliseconds. defaults to 0
     */
    maxAge?: number;
    /**
     * Tell the browser the resource is immutable and can be cached indefinitely. (defaults to false)
     */
    immutable?: boolean;
    /**
     * Allow transfer of hidden files. (defaults to false)
     */
    hidden?: boolean;
    /**
     * If not false (defaults to true),
     * format the path to serve static file servers and not require a trailing slash for directories,
     * so that you can do both /directory and /directory/.
     */
    format?: boolean;
    /**
     * Try to match extensions from passed array to search for file when no extension is sufficed in URL.
     * First found is served. (defaults to false)
     */
    extensions?: any | any[];
    /**
     * Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists. (defaults to true).
     */
    brotli?: boolean;
    /**
     * Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists.
     * defaults to true.
     */
    gzip?: boolean;
    /**
     * Function to set custom headers on response.
     */
    setHeaders?: (res: ServerResponse, path: string, stats: fs.Stats) => void;
}
