import { StackTrace } from '../StackTrace';
import { MetadataEnums, StackTraceEnums } from '../enums';
import chalk from 'chalk';
import { Session } from '../core';

/**
 * @module HttpServletSession
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export function HttpServletSession(target: Object, propertyKey: string, parameterIndex: number): void {
    StackTrace.defineControllerParameter(target.constructor, propertyKey)
    const paramTypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, target, propertyKey)
    if (paramTypes[parameterIndex] !== Session) {
        const error = new StackTrace(`Invalid Interface, ${chalk.yellowBright(`@HttpServletSession`)} decorator property Interface must be use ${chalk.yellowBright('Session')}`)
        error.setStackTraceInfo(StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey)
        const value = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`))
        if (value) {
           const data = value.replace(RegExp(`(${propertyKey}[\\s]*\\(|\\)|[\\r\\n])`, 'g'), '').split(',').map((value) => value.replace(/^[\s]*/, '').replace(/[\s]+$/, ''))
           const targetValue = data[parameterIndex]
           const highlightValue = chalk.bgRedBright(targetValue.replace(`@HttpServletSession `, ''))
           const replaceValue = value.replace(targetValue, `@HttpServletSession ${highlightValue}`)
           error.replace(value, replaceValue)
           error.resetCodeTarget(highlightValue)
        }
        throw error;
    }
    Reflect.defineMetadata(MetadataEnums.Controller.SESSION, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey)
}
