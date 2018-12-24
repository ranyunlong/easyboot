"use strict";
/**
 * @module HttpServletResponse
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const StackTrace_1 = require("../StackTrace/StackTrace");
const chalk_1 = require("chalk");
const core_1 = require("../core");
require("reflect-metadata");
/**
 * HttpServletResponse decorator
 *
 * The decorator apply to Contorllor handler.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@HttpServletResponse response: Request) {
 *        response.type = 'application/json'
 *        response.status = 200
 *        return {}
 *     }
 * }
 * ```
 */
function HttpServletResponse(target, propertyKey, parameterIndex) {
    StackTrace_1.StackTrace.defineControllerParameter(target.constructor, propertyKey);
    const paramTypes = Reflect.getMetadata(enums_1.MetadataEnums.Base.PARAMTYPES, target, propertyKey);
    if (paramTypes[parameterIndex] !== core_1.Response) {
        const error = new StackTrace_1.StackTrace(`Invalid Interface, ${chalk_1.default.yellowBright(`@HttpServletResponse`)} decorator property Interface must be use ${chalk_1.default.yellowBright('Response')}`);
        error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey);
        const value = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`));
        if (value) {
            const data = value.replace(RegExp(`(${propertyKey}[\\s]*\\(|\\)|[\\r\\n])`, 'g'), '').split(',').map((value) => value.replace(/^[\s]*/, '').replace(/[\s]+$/, ''));
            const targetValue = data[parameterIndex];
            const highlightValue = chalk_1.default.bgRedBright(targetValue.replace(`@HttpServletResponse `, ''));
            const replaceValue = value.replace(targetValue, `@HttpServletResponse ${highlightValue}`);
            error.replace(value, replaceValue);
            error.resetCodeTarget(highlightValue);
        }
        throw error;
    }
    Reflect.defineMetadata(enums_1.MetadataEnums.Controller.RESPONSE, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey);
}
exports.HttpServletResponse = HttpServletResponse;
