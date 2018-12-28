/**
 * @module ServletRequest
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums, StackTraceEnums } from '../enums';
import { StackTrace } from '../StackTrace/StackTrace';
import { Request } from '../core';
import chalk from 'chalk';

/**
 * ServletRequest decorator
 *
 * The decorator apply to Contorllor handler.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@ServletRequest request: Request) {
 *        return request.method
 *     }
 * }
 * ```
 */
export function ServletRequest(target: Object, propertyKey: string, parameterIndex: number): void {
    StackTrace.defineControllerParameter(target.constructor, propertyKey)
    const paramTypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, target, propertyKey)
    if (paramTypes[parameterIndex] !== Request) {
        const error = new StackTrace(`Invalid Interface, ${chalk.yellowBright(`@ServletRequest`)} decorator property Interface must be use ${chalk.yellowBright('Request')}`)
        error.setStackTraceInfo(StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey)
        const value = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`))
        if (value) {
           const data = value.replace(RegExp(`(${propertyKey}[\\s]*\\(|\\)|[\\r\\n])`, 'g'), '').split(',').map((value) => value.replace(/^[\s]*/, '').replace(/[\s]+$/, ''))
           const targetValue = data[parameterIndex]
           const highlightValue = chalk.bgRedBright(targetValue.replace(`@ServletRequest `, ''))
           const replaceValue = value.replace(targetValue, `@ServletRequest ${highlightValue}`)
           error.replace(value, replaceValue)
           error.resetCodeTarget(highlightValue)
        }
        throw error;
    }
    Reflect.defineMetadata(MetadataEnums.Controller.REQUEST, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey)
}