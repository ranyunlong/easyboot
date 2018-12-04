/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata'
import chalk from 'chalk'
import { DecoratorException } from './DecoratorException'
import { EasyBootEntityConstructor } from './EasyBootEntity'
import { createHash } from 'crypto'

/**
 * @decorator Module
 */
export function Module(config: ModuleInterface): ClassDecorator {
    return (target): void => {
        const options = target.prototype
        const { controllers = [], providers = []} = config
        controllers.forEach((controller) => {
            if (controller.prototype.type !== 'controller') {
                const msg = `Invalid Controller, you must be use ${chalk.yellowBright(`@Controller`)} decorator in "${controller.name}".`
                throw new DecoratorException(msg, controller.name)
            }
        })

        providers.forEach((service) => {
            if (service.prototype.type !== 'service') {
                const msg = `Invalid Service, you must be use ${chalk.yellowBright(`@Service`)} decorator in "${service.name}".`
                throw new DecoratorException(msg)
            }
        })
        options.controllers = controllers
        options.providers = providers
    }
}

/**
 * @decorator Modules
 */
export function Modules(modules: TClass[]) {
    return <T extends ModuleTargetClass>(target: T): void => {
        const options = target.prototype
        options.modules = modules
    }
}

/**
 * @decorator Modules
 */
export function Entity<T extends EasyBootEntityConstructor>(target: T): void {
    target.prototype.type = 'entity'
}

/**
 * @decorator Service
 */
export function Service<T extends TClass>(target: T): void {
    target.prototype.type = 'service'
    target.prototype.token = createHash('md5').update(target.toString()).digest('hex')
}

export interface ModuleTargetClass {
    new (...args: any[]): {
        modules: TClass[];
    }
}

export interface ModuleInterface {
    name?: string;
    controllers?: TClass[];
    providers?: TClass[];
}

export interface TClass<O = any, T = any> {
    new(...args: O[]): T
 }