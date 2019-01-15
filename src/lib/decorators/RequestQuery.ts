/**
 * @module RequestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums, StackTraceEnums } from '../enums';
import { Validation } from '../validation';
import { Validator } from '../validation/paramValidator';
import { StackTrace } from '../StackTrace/StackTrace';
import chalk from 'chalk';

/**
 * RequestQuery decorator
 *
 * The decorator apply to Contorllor handler.
 * Example1
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@RequestQuery('id', isInt) id: number) {
 *        return id
 *     }
 * }
 * ```
 * Example2
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@RequestQuery query: UserQueryEntity) {
 *        return id
 *     }
 * }
 * ```
 * Example3
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@RequestQuery('id') id: number) {
 *        return id
 *     }
 * }
 * ```
 * Example4
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@RequestQuery({id: isRequired}) query: any){
 *          return query.id
 *     }
 * }
 * ```
 */
export function RequestQuery(key: string): ParameterDecorator;
export function RequestQuery(key: string, validations: Validation<any> | Validator | Array<Validation<any> | Validator>): ParameterDecorator;
export function RequestQuery(fields: { [key: string]: Validation<any> | Validator | Array<Validation<any> | Validator> | null }): ParameterDecorator;
export function RequestQuery(target: Object, propertyKey: string, parameterIndex: number): void;
export function RequestQuery(...args: any[]): any {
    function decorator(target: Object, propertyKey: string, parameterIndex: number): void {
        StackTrace.defineControllerParameter(target.constructor, propertyKey)
        const parameterTypes = Reflect.getMetadata(MetadataEnums.Base.PARAMTYPES, target, propertyKey)
        const [key, validations] = args
        if (args.length === 2) {
            Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_QUERY, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey)
        } else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_QUERY, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey)
            } else if (typeof key === 'object') {
                if (Array.isArray(key)) {
                    const error = new StackTrace(`Invalid fields in ${chalk.yellowBright('@RequestQuery')} decorator`)
                    error.setStackTraceInfo(StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey)
                    const originCode = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`))
                    const code = originCode
                        .replace(RegExp(`^${propertyKey}[\\s]*\\(`), '')
                        .replace(/\r\n/g, '')
                        .replace(/\)$/, '')
                        .split(',').map((value) => value.replace(/^[\s]*/, ''))
                    const value = chalk.redBright('@RequestQuery')
                    const replaceValue = originCode.replace(code[parameterIndex], code[parameterIndex].replace('@RequestQuery', value))
                    error.replace(originCode, replaceValue)
                    error.resetCodeTarget(value)
                    throw error
                }
                Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_QUERY, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey)
            }
        } else {
            Reflect.defineMetadata(MetadataEnums.Controller.REQUEST_QUERY, {
                index: parameterIndex
            }, target.constructor, propertyKey)
        }
        if (Array.isArray(parameterTypes)) {
            const parameterType = parameterTypes[parameterIndex]
            if (parameterType === Array || parameterType === Object || parameterType === Number || parameterType === undefined || parameterType === Boolean || parameterType === Buffer) return;
            if (!Reflect.getMetadata(MetadataEnums.Base.ENTITY, parameterType)) {
                const err = new StackTrace('Invalid interface, the interface must be used @Entity decorator.')
                err.setStackTraceInfo(StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey)
                const code = err.getCode(RegExp(`\\@\\s*RequestQuery\\s*\\w*\\s*\\:\\s*${parameterType.name}`))
                const replaceValue = chalk.redBright(parameterType.name)
                err.replace(code, code.replace(parameterType.name, replaceValue))
                err.resetCodeTarget(replaceValue)
                throw err
            }
        }
    }
    if (args.length === 3) {
        return (decorator as any)(...args)
    } else {
        return decorator
    }
}