/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { ElementType } from './ElementType';
import { EntityConstructor } from '../Request';
/**
 * @method RequestMapping
 * @param path
 * @param method
 * @author ranyunlong<549510622@qq.com>
 */
export declare function RequestMapping(path: string, method?: ElementType.METHOD): RequestMappingDecorator;
/**
 * @method GetMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function GetMapping(path: string): MethodDecorator;
/**
 * @method PostMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function PostMapping(path: string): MethodDecorator;
/**
 * @method DeleteMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function DeleteMapping(path: string): MethodDecorator;
/**
 * @method CopyMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function CopyMapping(path: string): MethodDecorator;
/**
 * @method HeadMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function HeadMapping(path: string): MethodDecorator;
/**
 * @method LinkMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function LinkMapping(path: string): MethodDecorator;
/**
 * @method LinkMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function UnlinkMapping(path: string): MethodDecorator;
/**
 * @method OptionsMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function OptionsMapping(path: string): MethodDecorator;
/**
 * @method PatchMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function PatchMapping(path: string): MethodDecorator;
/**
 * @method PropfindMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function PropfindMapping(path: string): MethodDecorator;
/**
 * @method PurgeMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function PurgeMapping(path: string): MethodDecorator;
/**
 * @method PutMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function PutMapping(path: string): MethodDecorator;
/**
 * @method LockMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function LockMapping(path: string): MethodDecorator;
/**
 * @method UnlockMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function UnlockMapping(path: string): MethodDecorator;
/**
 * @method ViewMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
export declare function ViewMapping(path: string): MethodDecorator;
interface RequestMappingDecorator {
    <T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
    <TFunction extends Function>(target: TFunction): TFunction | void;
}
declare type PropertyKey = string;
declare type Method = string;
export declare type Routes = Map<Method, {
    path: string;
    propertyKey: PropertyKey;
    method: Method;
}>;
export declare type Propertys = Map<PropertyKey, {
    routes?: Routes;
    params?: Map<Number, EntityConstructor>;
    bodys?: Map<Number, EntityConstructor>;
}>;
export {};
