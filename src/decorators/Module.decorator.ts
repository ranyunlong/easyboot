/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MODULE, BASE } from '../constants/metadata.constant';
import { DevStackTrace } from '../core/DevStackTrace';
import { Ctor } from '../core/Servlet';

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
 *     ],
 *     providers: [],
 *     controllers: [
 *        IndexController
 *    ]
 * })
 * export class AppModule {}
 * ```
 */
export function Module(metadata: ModuleMetadata): ClassDecorator {
    return <TFunction extends Function>(target: Function): TFunction | void => {
        const trace = new DevStackTrace(`Invalid decorator: @Module(), arguments is invalid.`, {
            value: 'Module',
            scopes: [
                'meta.decorator.ts',
                'meta.function-call.ts',
                'entity.name.function.ts'
            ]
        })
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
                if (key === 'providers') {
                    const providers = metadata[key]
                    if (Array.isArray(providers)) {
                        providers.forEach((Service) => {
                            const isService =  Reflect.getMetadata(BASE.SERVICE, Service)
                            const injects = Reflect.getMetadata(BASE.PARAMTYPES, Service)
                            if (!isService) {
                                trace.message = `Invalid Service: ${Service.name}, The Service must be use @Service decorator.`
                                trace.throw({
                                    value: Service.name,
                                    scopes: [
                                        'meta.decorator.ts',
                                        'meta.objectliteral.ts',
                                        'meta.object.member.ts',
                                        'meta.array.literal.ts',
                                        'variable.other.readwrite.ts'
                                    ]
                                }, {
                                    value: ')',
                                    scopes: [
                                        'source.ts',
                                        'meta.decorator.ts',
                                        'meta.brace.round.ts'
                                    ]
                                })
                            }
                            if (Array.isArray(injects)) {
                                injects.forEach((inService) => {
                                    if (!providers.find((Serv) => inService === Serv)) {
                                        trace.message = `Invalid Service: ${Service.name}, this providers not in ${inService.name}.`
                                        trace.throw({
                                            value: Service.name,
                                            scopes: [
                                                'meta.decorator.ts',
                                                'meta.objectliteral.ts',
                                                'meta.object.member.ts',
                                                'meta.array.literal.ts',
                                                'variable.other.readwrite.ts'
                                            ]
                                        }, {
                                            value: ')',
                                            scopes: [
                                                'source.ts',
                                                'meta.decorator.ts',
                                                'meta.brace.round.ts'
                                            ]
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
                if (key === 'controllers') {
                    const controllers = metadata[key]
                    if (Array.isArray(controllers)) {
                        controllers.forEach((Controller) => {
                            const isController = Reflect.getMetadata(BASE.CONTROLLER, Controller)
                            const injects = Reflect.getMetadata(BASE.PARAMTYPES, Controller)
                            if (!isController) {
                                trace.throw({
                                    value: Controller.name,
                                    scopes: [
                                        'meta.decorator.ts',
                                        'meta.objectliteral.ts',
                                        'meta.object.member.ts',
                                        'meta.array.literal.ts',
                                        'variable.other.readwrite.ts'
                                    ]
                                }, {
                                    value: ')',
                                    scopes: [
                                        'source.ts',
                                        'meta.decorator.ts',
                                        'meta.brace.round.ts'
                                    ]
                                })
                            }
                            const providers = metadata['providers']
                            if (Array.isArray(injects)) {
                                injects.forEach((inService) => {
                                    if (!providers.find((Serv) => inService === Serv)) {
                                        trace.message = `Invalid Controller: ${Controller.name}, this providers not in ${inService.name}.`
                                        trace.throw({
                                            value: Controller.name,
                                            scopes: [
                                                'meta.decorator.ts',
                                                'meta.objectliteral.ts',
                                                'meta.object.member.ts',
                                                'meta.array.literal.ts',
                                                'variable.other.readwrite.ts'
                                            ]
                                        }, {
                                            value: ')',
                                            scopes: [
                                                'source.ts',
                                                'meta.decorator.ts',
                                                'meta.brace.round.ts'
                                            ]
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
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