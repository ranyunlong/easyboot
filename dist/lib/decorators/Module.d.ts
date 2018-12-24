/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata';
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
export declare function Module(metadata: ModuleMetadata): ClassDecorator;
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
