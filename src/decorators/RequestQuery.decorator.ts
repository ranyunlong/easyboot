/**
 * @module RequestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER } from '../constants/metadata.constant'
import { Validation } from '../validations/Validation';
import { Validator } from '../validations/validators';

/**
 * RequestQuery decorator
 *
 * The decorator apply to Contorllor handler.
 * Example1
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@RequestQuery('id', isInt) id: number) {
 *        return id
 *     }
 * }
 * ```
 * Example2
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@RequestQuery query: UserQueryEntity) {
 *        return id
 *     }
 * }
 * ```
 * Example3
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@RequestQuery('id') id: number) {
 *        return id
 *     }
 * }
 * ```
 * Example4
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@RequestQuery({id: isRequired}) query: any){
 *          return query.id
 *     }
 * }
 * ```
 */
export function RequestQuery(key: string): ParameterDecorator;
export function RequestQuery(fields: { [key: string]: Validation | Validator | Array<Validation | Validator> | null | false }): ParameterDecorator;
export function RequestQuery(key: string, validations: Validation | Validator | Array<Validation | Validator>): ParameterDecorator;
export function RequestQuery(target: Object, propertyKey: string, parameterIndex: number): void;
export function RequestQuery(...args: any[]): any  {
    function decorator(target: Object, propertyKey: string, parameterIndex: number): void {
        const [key, validations] = args
        if (args.length === 2) {
            Reflect.defineMetadata(CONTROLLER.REQUEST_QUERY, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey)
        } else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(CONTROLLER.REQUEST_QUERY, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey)
            } else if (typeof key === 'object') {
                Reflect.defineMetadata(CONTROLLER.REQUEST_QUERY, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey)
            }
        } else {
            Reflect.defineMetadata(CONTROLLER.REQUEST_QUERY, {
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