/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { Ctor } from '../types/index.api';

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
        return;
    }
}

export interface ModuleMetadata {
    imports?: Ctor[];
    controllers?: Ctor[];
    providers?: Ctor[];
    exports?: Ctor[];
}