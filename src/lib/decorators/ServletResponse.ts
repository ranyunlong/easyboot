/**
 * @module ServletResponse
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums, StackTraceEnums } from '../enums';
import { StackTrace } from '../StackTrace/StackTrace';
import chalk from 'chalk';
import { Response } from '../core';

/**
 * ServletResponse decorator
 *
 * The decorator apply to Contorllor handler.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@ServletResponse response: Request) {
 *        response.type = 'application/json'
 *        response.status = 200
 *        return {}
 *     }
 * }
 * ```
 */
export function ServletResponse(target: Object, propertyKey: string, parameterIndex: number): void {
    StackTrace.defineControllerParameter(target.constructor, propertyKey)
    const paramTypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, target, propertyKey)
    if (paramTypes[parameterIndex] !== Response) {
        const error = new StackTrace(`Invalid Interface, ${chalk.yellowBright(`@ServletResponse`)} decorator property Interface must be use ${chalk.yellowBright('Response')}`)
        error.setStackTraceInfo(StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey)
        const value = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`))
        if (value) {
           const data = value.replace(RegExp(`(${propertyKey}[\\s]*\\(|\\)|[\\r\\n])`, 'g'), '').split(',').map((value) => value.replace(/^[\s]*/, '').replace(/[\s]+$/, ''))
           const targetValue = data[parameterIndex]
           const highlightValue = chalk.bgRedBright(targetValue.replace(`@ServletResponse `, ''))
           const replaceValue = value.replace(targetValue, `@ServletResponse ${highlightValue}`)
           error.replace(value, replaceValue)
           error.resetCodeTarget(highlightValue)
        }
        throw error;
    }
    Reflect.defineMetadata(MetadataEnums.Controller.RESPONSE, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey)
}