"use strict";
/**
 * @class RouterConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class RouterConfiguration {
    constructor() {
        /**
         * When `true` the regexp will be case sensitive. (default: `false`)
         */
        this.sensitive = false;
        /**
         * When `true` the regexp allows an optional trailing delimiter to match. (default: `false`)
         */
        this.strict = false;
        /**
         * When `true` the regexp will match to the end of the string. (default: `true`)
         */
        this.end = true;
        /**
         * When `true` the regexp will match from the beginning of the string. (default: `true`)
         */
        this.start = true;
        /**
         * Sets the final character for non-ending optimistic matches. (default: `/`)
         */
        this.delimiter = '/';
    }
}
exports.RouterConfiguration = RouterConfiguration;
