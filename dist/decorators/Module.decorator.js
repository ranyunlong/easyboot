"use strict";
/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const DevStackTrace_1 = require("../core/DevStackTrace");
const metadataKeys = Object.keys(metadata_constant_1.MODULE);
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
function Module(metadata) {
    return (target) => {
        const trace = new DevStackTrace_1.DevStackTrace(`Invalid decorator: @Module(), arguments is invalid.`, {
            value: 'Module',
            scopes: [
                'meta.decorator.ts',
                'meta.function-call.ts',
                'entity.name.function.ts'
            ]
        });
        const propsKeys = Object.keys(metadata || {});
        if (Array.isArray(metadata)) {
            trace.message = `Invalid decorator: @Module(), argument is cannot be Array.`;
            trace.throw();
        }
        if (typeof metadata !== 'object') {
            trace.message = `Invalid decorator: @Module(), argument is must be Object.`;
            trace.throw();
        }
        propsKeys.forEach((key) => {
            const result = metadataKeys.find((metaKey) => metaKey === key.toUpperCase());
            if (result) {
                if (key === 'providers') {
                    const providers = metadata[key];
                    if (Array.isArray(providers)) {
                        providers.forEach((Service) => {
                            const isService = Reflect.getMetadata(metadata_constant_1.BASE.SERVICE, Service);
                            const injects = Reflect.getMetadata(metadata_constant_1.BASE.PARAMTYPES, Service);
                            if (!isService) {
                                trace.message = `Invalid Service: ${Service.name}, The Service must be use @Service decorator.`;
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
                                });
                            }
                            if (Array.isArray(injects)) {
                                injects.forEach((inService) => {
                                    if (!providers.find((Serv) => inService === Serv)) {
                                        trace.message = `Invalid Service: ${Service.name}, this providers not in ${inService.name}.`;
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
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
                if (key === 'controllers') {
                    const controllers = metadata[key];
                    if (Array.isArray(controllers)) {
                        controllers.forEach((Controller) => {
                            const isController = Reflect.getMetadata(metadata_constant_1.BASE.CONTROLLER, Controller);
                            const injects = Reflect.getMetadata(metadata_constant_1.BASE.PARAMTYPES, Controller);
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
                                });
                            }
                            const providers = metadata['providers'];
                            if (Array.isArray(injects)) {
                                injects.forEach((inService) => {
                                    if (!providers.find((Serv) => inService === Serv)) {
                                        trace.message = `Invalid Controller: ${Controller.name}, this providers not in ${inService.name}.`;
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
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
                Reflect.defineMetadata(metadata_constant_1.MODULE[result], metadata[key], target);
            }
            else {
                trace.message = `Invalid decorator: @Module(), arguments property: '${key}' is invalid.`;
                trace.throw();
            }
        });
    };
}
exports.Module = Module;
//# sourceMappingURL=Module.decorator.js.map