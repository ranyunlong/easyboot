/**
 * @module Module
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataElementTypes } from '../enums'
import { DecoratorException } from '../exception';

const { COMPONENTS, CONTROLLERS, PROVIDERS, IMPORTS, EXPORTS, MODULES } = MetadataElementTypes.Metadata
const metadataKeys = [COMPONENTS, CONTROLLERS, PROVIDERS, IMPORTS, EXPORTS, MODULES]

export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target): void => {
        const propsKeys = Object.keys(metadata)
        propsKeys.forEach((property) => {
            const result = metadataKeys.find((key) => property === key)
            if (!result) {
                throw new DecoratorException(`Invalid property '${property}' in @Module() decorator.`, property)
            }
            Reflect.defineMetadata(property, (metadata as any)[property], target)
        })
    }
}

export interface ModuleMetadata {
    imports?: CType[];
    controllers?: CType[];
    providers?: Provider[];
    exports?: CType[];
    modules?: CType[];
    components?: Provider[];
}

export interface CType<T = any> extends Function {
    new (...args: any[]): T;
}

export declare type Provider = CType | ClassProvider | ValueProvider | FactoryProvider;
export interface ClassProvider {
    provide: any;
    useClass: CType<any>;
}
export interface ValueProvider {
    provide: any;
    useValue: any;
}
export interface FactoryProvider {
    provide: any;
    useFactory: (...args: any[]) => any;
    inject?: Array<CType<any> | string | any>;
}
