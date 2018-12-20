/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums, PREFIX, StackTraceEnums } from '../enums'
import { StackTrace } from '../StackTrace/StackTrace';
import chalk from 'chalk';

const { CONTROLLERS, PROVIDERS, IMPORTS, EXPORTS } = MetadataEnums.Module
const metadataKeys = [CONTROLLERS, PROVIDERS, IMPORTS, EXPORTS]

/**
 * Module decorator
 *
 * The decorator apply to Module.
 *
 * Example
 * ```
 * @Module({
 *     imports: [
 *         AdminModule
 *    ],
 *     providers: [],
 *    controllers: [
 *        IndexController
 *    ]
 * })
 * export class AppModule {}
 * ```
 */
export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target: any): void => {
        StackTrace.defineModule(target)
        const propsKeys = Object.keys(metadata)
        propsKeys.forEach((property: keyof ModuleMetadata) => {
            if (!Array.isArray(metadata[property])) {
                const error = new StackTrace(`Invalid property ${chalk.yellowBright(property)} must be Array.`)
                error.setStackTraceInfo(StackTraceEnums.DECORATOR.MODULE, target)
                const replaceValue = chalk.bgRedBright(property)
                error.replace(RegExp(`${property}[\\s]*\\:`), chalk.bgRedBright(property) + ':')
                error.resetCodeTarget(replaceValue)
                throw error
            }
            const result = metadataKeys.find((key) => PREFIX + property === key)
            if (!result) {
                const error = new StackTrace(`Invalid property ${chalk.yellowBright(property)}, @Module decorator cannot use ${chalk.yellowBright(property)} property.`)
                error.setStackTraceInfo(StackTraceEnums.DECORATOR.MODULE, target)
                const replaceValue = chalk.bgRedBright(property)
                error.replace(RegExp(`${property}[\\s]*\\:`), chalk.bgRedBright(property) + ':')
                error.resetCodeTarget(replaceValue)
                throw error
            }
            Reflect.defineMetadata(PREFIX + property, metadata[property], target)
        })

        if (Array.isArray(metadata.controllers)) {
            metadata.controllers.forEach((Controller) => {
                const isController = Reflect.getMetadata(MetadataEnums.Controller.IS_CONTROLLER, Controller)
                if (!isController) {
                    // throw new DecoratorException(`Invalid controller, Your must be use ${chalk.yellowBright(`@Controller`)} decorator in ${chalk.yellowBright(Controller.name)}.`, Controller.name)
                    const error = new StackTrace(`Invalid controller, Your must be use ${chalk.yellowBright(`@Controller`)} decorator in ${chalk.yellowBright(Controller.name)}.`)
                    error.setStackTraceInfo(StackTraceEnums.DECORATOR.MODULE, target)
                    const originCode = error.getCode(/controllers[\s]*\:[\s]*\[[\r\n\s\,\w]*\]/)
                    const replaceValue = chalk.bgRedBright(Controller.name)
                    error.replace(originCode, originCode.replace(Controller.name, replaceValue))
                    error.resetCodeTarget(replaceValue)
                    throw error
                }
            })
        }
    }
}

export interface ModuleMetadata {
    imports?: CType[];
    controllers?: CType[];
    providers?: Provider[];
    exports?: CType[];
}

export interface CType<T = any> extends Function {
    new (...args: any[]): T;
}

export declare type Provider = CType;
