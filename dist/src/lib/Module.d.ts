/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export declare function Module(config: ModuleInterface): ClassDecorator;
export declare function Modules(modules: TClass[]): ClassDecorator;
export interface ModuleInterface {
    controllers?: TClass[];
    providers?: TClass[];
    entity?: TClass[];
    configs?: TClass[];
}
export interface TClass<O = any, T = any> {
    new (...args: O[]): T;
}
