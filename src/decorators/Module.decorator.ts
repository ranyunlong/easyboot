/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { Ctor } from '../types/index.api';
import { MODULE } from '../constants/metadata.constant';
import { DevStackTace } from '../core/DevStackTace';

const metadataKeys = Object.keys(MODULE)

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
    return <TFunction extends Function>(target: Function): TFunction | void => {
        const trace = new DevStackTace(`Invalid decorator: @Module(), arguments is invalid.`, 'meta.decorator.ts', 'Module')
        const propsKeys = Object.keys(metadata || {})
        if (Array.isArray(metadata)) {
            trace.message = `Invalid decorator: @Module(), argument is cannot be Array.`
            trace.throw()
        }
        if (typeof metadata !== 'object') {
            trace.message = `Invalid decorator: @Module(), argument is must be Object.`
            trace.throw()
        }
        propsKeys.forEach((key: keyof ModuleMetadata) => {
            const result = metadataKeys.find((metaKey) => metaKey === key.toUpperCase())
            if (result) {
                Reflect.defineMetadata(MODULE[result as keyof MODULE], metadata[key], target)
            } else {
                trace.message = `Invalid decorator: @Module(), arguments property: '${key}' is invalid.`
                trace.throw()
            }
        })
    }
}

export interface ModuleMetadata {
    controllers: Ctor[];
    providers?: Ctor[];
}