"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class ServletConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
class ServletConfiguration {
    constructor() {
        /**
         * defaulting to the NODE_ENV or "development"
         */
        this.env = 'development';
        /**
         * offset of .subdomains to ignore [2]
         */
        this.subdomainOffse = 2;
        /**
         * Server http port config
         */
        this.port = 3000;
        /**
         * Server http host
         */
        this.host = 'localhost';
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
        this.keys = ['easyboot', 'servlet'];
    }
}
exports.ServletConfiguration = ServletConfiguration;
//# sourceMappingURL=ServletConfiguration.js.map