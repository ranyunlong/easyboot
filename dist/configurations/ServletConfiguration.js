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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldENvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlndXJhdGlvbnMvU2VydmxldENvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7Ozs7R0FLRztBQUNILE1BQWEsb0JBQW9CO0lBQWpDO1FBRUk7O1dBRUc7UUFDSSxRQUFHLEdBQVMsYUFBYSxDQUFBO1FBT2hDOztXQUVHO1FBQ0ksbUJBQWMsR0FBWSxDQUFDLENBQUE7UUFFbEM7O1dBRUc7UUFDSSxTQUFJLEdBQVksSUFBSSxDQUFBO1FBRTNCOztXQUVHO1FBQ0ksU0FBSSxHQUFZLFdBQVcsQ0FBQTtRQUVsQzs7Ozs7Ozs7O1dBU0c7UUFDSSxTQUFJLEdBQXlCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBcUIvRCxDQUFDO0NBQUE7QUExREQsb0RBMERDIn0=