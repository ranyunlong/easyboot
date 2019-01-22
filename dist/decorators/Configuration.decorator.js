"use strict";
/**
 * @module Configuration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
/**
 * Configuration decorator
 *
 * The decorator apply EasyBootServlet application.
 *
 * Example
 * ```
 * @Configuration(ApplicationConfig)
 * export class Application extends HttpServlet {
 *    public async run(context: Context) {}
 * }
 * ```
 */
function Configuration(metadata) {
    return (target) => {
        Reflect.defineMetadata(metadata_constant_1.BASE.CONFIGURATION, metadata, target);
    };
}
exports.Configuration = Configuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJhdGlvbi5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVjb3JhdG9ycy9Db25maWd1cmF0aW9uLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBR0gsc0VBQXNEO0FBQ3REOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILFNBQWdCLGFBQWEsQ0FBQyxRQUFjO0lBQ3hDLE9BQU8sQ0FBQyxNQUFNLEVBQVEsRUFBRTtRQUNwQixPQUFPLENBQUMsY0FBYyxDQUFDLHdCQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUE7QUFDTCxDQUFDO0FBSkQsc0NBSUMifQ==