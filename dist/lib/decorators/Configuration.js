"use strict";
/**
 * @module Configuration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
require("reflect-metadata");
/**
 * Configuration decorator
 *
 * The decorator apply EasyBootServlet application.
 *
 * Example
 * ```
 * @Configuration(ApplicationConfig)
 * export class Application extends EasyBootServlet {
 *    public async run(context: Context) {}
 * }
 * ```
 */
function Configuration(metadata) {
    return (target) => {
        Reflect.defineMetadata(enums_1.MetadataEnums.Base.CONFIGURATION, metadata, target);
    };
}
exports.Configuration = Configuration;
