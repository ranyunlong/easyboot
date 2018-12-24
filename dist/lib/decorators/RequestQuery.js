"use strict";
/**
 * @module RequestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const StackTrace_1 = require("../StackTrace/StackTrace");
const chalk_1 = require("chalk");
require("reflect-metadata");
function RequestQuery(...args) {
    function decorator(target, propertyKey, parameterIndex) {
        StackTrace_1.StackTrace.defineControllerParameter(target.constructor, propertyKey);
        const [key, validations] = args;
        if (args.length === 2) {
            Reflect.defineMetadata(enums_1.MetadataEnums.Controller.REQUEST_QUERY, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey);
        }
        else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(enums_1.MetadataEnums.Controller.REQUEST_QUERY, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey);
            }
            else if (typeof key === 'object') {
                if (Array.isArray(key)) {
                    const error = new StackTrace_1.StackTrace(`Invalid fields in ${chalk_1.default.yellowBright('@RequestQuery')} decorator`);
                    error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey);
                    const originCode = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`));
                    const code = originCode
                        .replace(RegExp(`^${propertyKey}[\\s]*\\(`), '')
                        .replace(/\r\n/g, '')
                        .replace(/\)$/, '')
                        .split(',').map((value) => value.replace(/^[\s]*/, ''));
                    const value = chalk_1.default.redBright('@RequestQuery');
                    const replaceValue = originCode.replace(code[parameterIndex], code[parameterIndex].replace('@RequestQuery', value));
                    error.replace(originCode, replaceValue);
                    error.resetCodeTarget(value);
                    throw error;
                }
                Reflect.defineMetadata(enums_1.MetadataEnums.Controller.REQUEST_QUERY, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey);
            }
        }
        else {
            Reflect.defineMetadata(enums_1.MetadataEnums.Controller.REQUEST_QUERY, {
                index: parameterIndex
            }, target.constructor, propertyKey);
        }
    }
    if (args.length === 3) {
        return decorator(...args);
    }
    else {
        return decorator;
    }
}
exports.RequestQuery = RequestQuery;
