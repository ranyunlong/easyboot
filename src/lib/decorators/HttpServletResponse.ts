import { MetadataEnums, StackTraceEnums } from '../enums';
import { StackTrace } from '../StackTrace/StackTrace';
import chalk from 'chalk';
import { Response } from '../core';

export function HttpServletResponse(target: Object, propertyKey: string, parameterIndex: number): void {
    StackTrace.defineControllerParameter(target.constructor, propertyKey)
    const paramTypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, target, propertyKey)
    if (paramTypes[parameterIndex] !== Response) {
        const error = new StackTrace(`Invalid Interface, ${chalk.yellowBright(`@HttpServletResponse`)} decorator property Interface must be use ${chalk.yellowBright('Response')}`)
        error.setStackTraceInfo(StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey)
        const value = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`))
        if (value) {
           const data = value.replace(RegExp(`(${propertyKey}[\\s]*\\(|\\)|[\\r\\n])`, 'g'), '').split(',').map((value) => value.replace(/^[\s]*/, '').replace(/[\s]+$/, ''))
           const targetValue = data[parameterIndex]
           const highlightValue = chalk.bgRedBright(targetValue.replace(`@HttpServletResponse `, ''))
           const replaceValue = value.replace(targetValue, `@HttpServletResponse ${highlightValue}`)
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