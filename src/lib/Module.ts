/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export function Module(config: ModuleInterface): ClassDecorator {
    return (target): void => {
        const options = target.prototype
        options.controllers = config.controllers || new Set<TClass>()
        options.providers = config.providers || new Set<TClass>()
        options.models = config.models || new Set<TClass>()
        options.configs = config.configs || new Set<TClass>()
    }
}

export interface ModuleInterface {
    controllers: Set<TClass>;
    providers: Set<TClass>;
    models: Set<TClass>;
    configs: Set<TClass>
}

export interface TClass<O = any, T = any> {
    new(...args: O[]): T
 }