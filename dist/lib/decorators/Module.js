"use strict";
/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const StackTrace_1 = require("../StackTrace/StackTrace");
const chalk_1 = require("chalk");
require("reflect-metadata");
const { CONTROLLERS, PROVIDERS, IMPORTS, EXPORTS } = enums_1.MetadataEnums.Module;
const metadataKeys = [CONTROLLERS, PROVIDERS, IMPORTS, EXPORTS];
/**
 * Module decorator
 *
 * The decorator apply to Module.
 *
 * Example
 * ```
 * @Module({
 *     imports: [
 *         AdminModule
 *    ],
 *     providers: [],
 *    controllers: [
 *        IndexController
 *    ]
 * })
 * export class AppModule {}
 * ```
 */
function Module(metadata) {
    return (target) => {
        StackTrace_1.StackTrace.defineModule(target);
        const propsKeys = Object.keys(metadata);
        propsKeys.forEach((property) => {
            if (!Array.isArray(metadata[property])) {
                const error = new StackTrace_1.StackTrace(`Invalid property ${chalk_1.default.yellowBright(property)} must be Array.`);
                error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.MODULE, target);
                const replaceValue = chalk_1.default.bgRedBright(property);
                error.replace(RegExp(`${property}[\\s]*\\:`), chalk_1.default.bgRedBright(property) + ':');
                error.resetCodeTarget(replaceValue);
                throw error;
            }
            const result = metadataKeys.find((key) => enums_1.PREFIX + property === key);
            if (!result) {
                const error = new StackTrace_1.StackTrace(`Invalid property ${chalk_1.default.yellowBright(property)}, @Module decorator cannot use ${chalk_1.default.yellowBright(property)} property.`);
                error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.MODULE, target);
                const replaceValue = chalk_1.default.bgRedBright(property);
                error.replace(RegExp(`${property}[\\s]*\\:`), chalk_1.default.bgRedBright(property) + ':');
                error.resetCodeTarget(replaceValue);
                throw error;
            }
            Reflect.defineMetadata(enums_1.PREFIX + property, metadata[property], target);
        });
        if (Array.isArray(metadata.controllers)) {
            metadata.controllers.forEach((Controller) => {
                const isController = Reflect.getMetadata(enums_1.MetadataEnums.Controller.IS_CONTROLLER, Controller);
                if (!isController) {
                    const error = new StackTrace_1.StackTrace(`Invalid controller, Your must be use ${chalk_1.default.yellowBright(`@Controller`)} decorator in ${chalk_1.default.yellowBright(Controller.name)}.`);
                    error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.MODULE, target);
                    const originCode = error.getCode(/controllers[\s]*\:[\s]*\[[\r\n\s\,\w]*\]/);
                    const replaceValue = chalk_1.default.bgRedBright(Controller.name);
                    error.replace(originCode, originCode.replace(Controller.name, replaceValue));
                    error.resetCodeTarget(replaceValue);
                    throw error;
                }
            });
        }
    };
}
exports.Module = Module;
