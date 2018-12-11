/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataElementTypes } from '../enums'
import { DecoratorException } from '../exception';
import chalk from 'chalk';

const { COMPONENTS, CONTROLLERS, PROVIDERS, IMPORTS, EXPORTS, MODULES, PREFIX, EXCEPTION_TRACE } = MetadataElementTypes.Metadata
const metadataKeys = [COMPONENTS, CONTROLLERS, PROVIDERS, IMPORTS, EXPORTS, MODULES]

export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target: any): void => {
        const propsKeys = Object.keys(metadata)
        propsKeys.forEach((property) => {
            const result = metadataKeys.find((key) => PREFIX + property === key)
            if (!result) {
                throw new DecoratorException(`Invalid property '${property}' in @Module() decorator.`, property)
            }
            Reflect.defineMetadata(PREFIX + property, (metadata as any)[property], target)
        })

        if (Array.isArray(metadata.controllers)) {
            metadata.controllers.forEach((Controller) => {
                const isController = Reflect.getMetadata(MetadataElementTypes.Metadata.IS_CONTROLLER, Controller)
                if (!isController) {
                    throw new DecoratorException(`Invalid controller, Your must be use ${chalk.yellowBright(`@Controller`)} decorator in ${chalk.yellowBright(Controller.name)}.`, Controller.name)
                }
            })
        }

        Reflect.defineMetadata(EXCEPTION_TRACE, new DecoratorException(''), target)
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
