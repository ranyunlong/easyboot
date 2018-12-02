/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export function Module(config: ModuleInterface): ClassDecorator {
    return (target): void => {
        const options = target.prototype
        options.$controllers = config.controllers || []
        options.$providers = config.providers || []
        options.$entity = config.entity || []
        options.$configs = config.configs || []
    }
}

export function Modules(modules: TClass[]): ClassDecorator {
    return (target): void => {
        const options = target.prototype
        options.modules = modules
    }
}

export interface ModuleInterface {
    controllers?: TClass[];
    providers?: TClass[];
    entity?: TClass[];
    configs?: TClass[];
}

export interface TClass<O = any, T = any> {
    new(...args: O[]): T
 }