"use strict";
/**
 * @class StaticConfiguration
 */
Object.defineProperty(exports, "__esModule", { value: true });
class StaticConfiguration {
    constructor(root) {
        /**
         * If true, in controler after response.
         */
        this.defer = false;
        /**
         * Default file name, defaults to 'index.html'
         */
        this.index = 'index.html';
        /**
         * maxage Browser cache max-age in milliseconds. defaults to 0
         */
        this.maxage = 0;
        /**
         * maxage Browser cache max-age in milliseconds. defaults to 0
         */
        this.maxAge = 0;
        /**
         * Tell the browser the resource is immutable and can be cached indefinitely. (defaults to false)
         */
        this.immutable = false;
        /**
         * Allow transfer of hidden files. (defaults to false)
         */
        this.hidden = false;
        /**
         * If not false (defaults to true),
         * format the path to serve static file servers and not require a trailing slash for directories,
         * so that you can do both /directory and /directory/.
         */
        this.format = true;
        /**
         * Try to match extensions from passed array to search for file when no extension is sufficed in URL.
         * First found is served. (defaults to false)
         */
        this.extensions = false;
        /**
         * Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists. (defaults to true).
         */
        this.brotli = true;
        /**
         * Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists.
         * defaults to true.
         */
        this.gzip = true;
        this.root = root;
    }
}
exports.StaticConfiguration = StaticConfiguration;
