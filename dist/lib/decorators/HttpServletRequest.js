"use strict";
/**
 * @module HttpServletRequest
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const StackTrace_1 = require("../StackTrace/StackTrace");
const core_1 = require("../core");
const chalk_1 = require("chalk");
require("reflect-metadata");
/**
 * HttpServletRequest decorator
 *
 * The decorator apply to Contorllor handler.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@HttpServletRequest request: Request) {
 *        return request.method
 *     }
 * }
 * ```
 */
function HttpServletRequest(target, propertyKey, parameterIndex) {
    StackTrace_1.StackTrace.defineControllerParameter(target.constructor, propertyKey);
    const paramTypes = Reflect.getMetadata(enums_1.MetadataEnums.Base.PARAMTYPES, target, propertyKey);
    if (paramTypes[parameterIndex] !== core_1.Request) {
        const error = new StackTrace_1.StackTrace(`Invalid Interface, ${chalk_1.default.yellowBright(`@HttpServletRequest`)} decorator property Interface must be use ${chalk_1.default.yellowBright('Request')}`);
        error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey);
        const value = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`));
        if (value) {
            const data = value.replace(RegExp(`(${propertyKey}[\\s]*\\(|\\)|[\\r\\n])`, 'g'), '').split(',').map((value) => value.replace(/^[\s]*/, '').replace(/[\s]+$/, ''));
            const targetValue = data[parameterIndex];
            const highlightValue = chalk_1.default.bgRedBright(targetValue.replace(`@HttpServletRequest `, ''));
            const replaceValue = value.replace(targetValue, `@HttpServletRequest ${highlightValue}`);
            error.replace(value, replaceValue);
            error.resetCodeTarget(highlightValue);
        }
        throw error;
    }
    Reflect.defineMetadata(enums_1.MetadataEnums.Controller.REQUEST, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey);
}
exports.HttpServletRequest = HttpServletRequest;
