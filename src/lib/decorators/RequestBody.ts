/**
 * @module RequestBody
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums, StackTraceEnums } from '../enums';
import { Validation } from '../validation';
import { Validator } from '../validation/paramValidator';
import { StackTrace } from '../StackTrace/StackTrace';
import chalk from 'chalk';

export function RequestBody(fields: { [key: string]: Validation<any> | Validator | Array<Validation<any> | Validator> | null }): ParameterDecorator;
export function RequestBody(key: string): ParameterDecorator;
export function RequestBody(key: string, validations: Validation<any> | Validator | Array<Validation<any> | Validator>): ParameterDecorator;
export function RequestBody(target: Object, propertyKey: string, parameterIndex: number): void;
export function RequestBody(...args: any[]): any {
    function decorator(target: Object, propertyKey: string, parameterIndex: number): void {
        StackTrace.defineControllerParameter(target.constructor, propertyKey)
        const [key, validations] = args
        if (args.length === 2) {
            Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_BODY, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey)
        } else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_BODY, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey)
            } else if (typeof key === 'object') {
                if (Array.isArray(key)) {
                    const error = new StackTrace(`Invalid fields in ${chalk.yellowBright('@RequestBody')} decorator`)
                    error.setStackTraceInfo(StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey)
                    const originCode = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`))
                    const code = originCode
                        .replace(RegExp(`^${propertyKey}[\\s]*\\(`), '')
                        .replace(/\r\n/g, '')
                        .replace(/\)$/, '')
                        .split(',').map((value) => value.replace(/^[\s]*/, ''))
                    const value = chalk.redBright('@RequestBody')
                    const replaceValue = originCode.replace(code[parameterIndex], code[parameterIndex].replace('@RequestBody', value))
                    error.replace(originCode, replaceValue)
                    error.resetCodeTarget(value)
                    throw error
                }
                Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_BODY, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey)
            }
        } else {
            Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_BODY, {
                index: parameterIndex
            }, target.constructor, propertyKey)
        }
    }
    if (args.length === 3) {
        return (decorator as any)(...args)
    } else {
        return decorator
    }
}