"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StackTrace_1 = require("../StackTrace");
const enums_1 = require("../enums");
const chalk_1 = require("chalk");
const core_1 = require("../core");
/**
 * @module HttpServletSession
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
function HttpServletSession(target, propertyKey, parameterIndex) {
    StackTrace_1.StackTrace.defineControllerParameter(target.constructor, propertyKey);
    const paramTypes = Reflect.getMetadata(enums_1.MetadataEnums.Base.PARAMTYPES, target, propertyKey);
    if (paramTypes[parameterIndex] !== core_1.Session) {
        const error = new StackTrace_1.StackTrace(`Invalid Interface, ${chalk_1.default.yellowBright(`@HttpServletSession`)} decorator property Interface must be use ${chalk_1.default.yellowBright('Session')}`);
        error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey);
        const value = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`));
        if (value) {
            const data = value.replace(RegExp(`(${propertyKey}[\\s]*\\(|\\)|[\\r\\n])`, 'g'), '').split(',').map((value) => value.replace(/^[\s]*/, '').replace(/[\s]+$/, ''));
            const targetValue = data[parameterIndex];
            const highlightValue = chalk_1.default.bgRedBright(targetValue.replace(`@HttpServletSession `, ''));
            const replaceValue = value.replace(targetValue, `@HttpServletSession ${highlightValue}`);
            error.replace(value, replaceValue);
            error.resetCodeTarget(highlightValue);
        }
        throw error;
    }
    Reflect.defineMetadata(enums_1.MetadataEnums.Controller.SESSION, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey);
}
exports.HttpServletSession = HttpServletSession;
