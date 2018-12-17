import { MetadataEnums, StackTraceEnums } from '../enums';
import { StackTrace } from '../StackTrace/StackTrace';
import { Request } from '../core';
import chalk from 'chalk';

export function HttpServletRequest(target: Object, propertyKey: string, parameterIndex: number): void {
    StackTrace.defineControllerParameter(target.constructor, propertyKey)
    const paramTypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, target, propertyKey)
    if (paramTypes[parameterIndex] !== Request) {
        const error = new StackTrace(`Invalid Interface, ${chalk.yellowBright(`@HttpServletRequest`)} decorator property Interface must be use ${chalk.yellowBright('Request')}`)
        error.setStackTraceInfo(StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey)
        const value = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`))
        if (value) {
           const data = value.replace(RegExp(`(${propertyKey}[\\s]*\\(|\\)|[\\r\\n])`, 'g'), '').split(',').map((value) => value.replace(/^[\s]*/, '').replace(/[\s]+$/, ''))
           const targetValue = data[parameterIndex]
           const highlightValue = chalk.bgRedBright(targetValue.replace(`@HttpServletRequest `, ''))
           const replaceValue = value.replace(targetValue, `@HttpServletRequest ${highlightValue}`)
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