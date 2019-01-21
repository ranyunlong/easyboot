/**
 * @module RequestParam
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER } from '../constants/metadata.constant'
import { Validation } from '../validations/Validation';
import { Validator } from '../validations/validators';

/**
 * RequestParam decorator
 *
 * The decorator apply to Contorllor handler.
 * Example1
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping(':id/:name')
 *     public index(@RequestParam('id', isInt) id: number) {
 *        return id
 *     }
 * }
 * ```
 * Example2
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping(':id')
 *     public index(@RequestParam paramEntity: ParamEntity) {
 *        return paramEntity
 *     }
 * }
 * ```
 * Example3
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping(':id')
 *     public index(@RequestParam('id') id: number) {
 *        return id
 *     }
 * }
 * ```
 * Example4
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @PostMapping(':id')
 *     public index(@RequestParam({id: isRequired}) params: any){
 *          return params.id
 *     }
 * }
 * ```
 */
export function RequestParam(key: string): ParameterDecorator;
export function RequestParam(fields: { [key: string]: Validation | Validator | Array<Validation | Validator> | null | false }): ParameterDecorator;
export function RequestParam(key: string, validations: Validation | Validator | Array<Validation | Validator>): ParameterDecorator;
export function RequestParam(target: Object, propertyKey: string, parameterIndex: number): void;
export function RequestParam(...args: any[]): any  {
    function decorator(target: Object, propertyKey: string, parameterIndex: number): void {
        const [key, validations] = args
        if (args.length === 2) {
            Reflect.defineMetadata(CONTROLLER.REQUEST_PARAM, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey)
        } else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(CONTROLLER.REQUEST_PARAM, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey)
            } else if (typeof key === 'object') {
                Reflect.defineMetadata(CONTROLLER.REQUEST_PARAM, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey)
            }
        } else {
            Reflect.defineMetadata(CONTROLLER.REQUEST_PARAM, {
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