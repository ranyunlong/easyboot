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
//# sourceMappingURL=Configuration.decorator.js.map