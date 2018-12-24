"use strict";
/**
 * @module EasyBootApplication
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
require("reflect-metadata");
/**
 * EasyBootApplication decorator
 *
 * The decorator apply to EasyBootApplication.
 *
 * Example
 * ```
 * @Configuration(ApplicationConfig)
 * @EasyBootApplication(RootModule)
 * export class Application extends EasyBootServlet {
 * }
 *
 * new Application()
 * ```
 */
function EasyBootApplication(metadata) {
    return (target) => {
        Reflect.defineMetadata(enums_1.MetadataEnums.Base.EASYBOOTMODULE, metadata, target);
    };
}
exports.EasyBootApplication = EasyBootApplication;
