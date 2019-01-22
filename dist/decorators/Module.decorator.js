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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL01vZHVsZS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUdILHNFQUE4RDtBQUM5RCx5REFBc0Q7QUFFdEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBTSxDQUFDLENBQUE7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxRQUF3QjtJQUMzQyxPQUFPLENBQTZCLE1BQWdCLEVBQW9CLEVBQUU7UUFDdEUsTUFBTSxLQUFLLEdBQUcsSUFBSSw2QkFBYSxDQUFDLHFEQUFxRCxFQUFFO1lBQ25GLEtBQUssRUFBRSxRQUFRO1lBQ2YsTUFBTSxFQUFFO2dCQUNKLG1CQUFtQjtnQkFDbkIsdUJBQXVCO2dCQUN2Qix5QkFBeUI7YUFDNUI7U0FDSixDQUFDLENBQUE7UUFDRixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM3QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekIsS0FBSyxDQUFDLE9BQU8sR0FBRyw0REFBNEQsQ0FBQTtZQUM1RSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUE7U0FDaEI7UUFDRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUM5QixLQUFLLENBQUMsT0FBTyxHQUFHLDJEQUEyRCxDQUFBO1lBQzNFLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQTtTQUNoQjtRQUNELFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUF5QixFQUFFLEVBQUU7WUFDNUMsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxX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