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
 *     ],
 *     providers: [],
 *     controllers: [
 *        IndexController
 *    ]
 * })
 * export class AppModule {}
 * ```
 */
export declare function Module(metadata: ModuleMetadata): ClassDecorator;
export interface ModuleMetadata {
    controllers: Ctor[];
    providers?: Ctor[];
}
