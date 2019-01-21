/**
 * @module RequestBody
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER } from '../constants/metadata.constant'
import { Validation } from '../validations/Validation';
import { Validator } from '../validations/validators';

/**
 * RequestBody decorator
 *
 * The decorator apply to Contorllor handler.
 * Example1
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping
 *     public index(@RequestBody('id', isInt) id: number) {
 *        return id
 *     }
 * }
 * ```
 * Example2
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping
 *     public index(@RequestBody userEntity: UserEntity) {
 *        return userEntity
 *     }
 * }
 * ```
 * Example3
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping
 *     public index(@RequestBody('id') id: number) {
 *        return id
 *     }
 * }
 * ```
 * Example4
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping
 *     public index(@RequestBody({id: isRequired}) body: any){
 *          return body.id
 *     }
 * }
 * ```
 */
export function RequestBody(key: string): ParameterDecorator;
export function RequestBody(fields: { [key: string]: Validation | Validator | Array<Validation | Validator> | null | false }): ParameterDecorator;
export function RequestBody(key: string, validations: Validation | Validator | Array<Validation | Validator>): ParameterDecorator;
export function RequestBody(target: Object, propertyKey: string, parameterIndex: number): void;
export function RequestBody(...args: any[]): any  {
    function decorator(target: Object, propertyKey: string, parameterIndex: number): void {
        const [key, validations] = args
        if (args.length === 2) {
            Reflect.defineMetadata(CONTROLLER.REQUEST_BODY, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey)
        } else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(CONTROLLER.REQUEST_BODY, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey)
            } else if (typeof key === 'object') {
                Reflect.defineMetadata(CONTROLLER.REQUEST_BODY, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey)
            }
        } else {
            Reflect.defineMetadata(CONTROLLER.REQUEST_BODY, {
                index: parameterIndex
            }, target.constructor, propertyKey)
        }
    }

    if (args.length === 3) {
        return (decorator as any)(...args)
    } else {
        return decorator
    }
}