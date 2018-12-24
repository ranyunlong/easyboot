/**
 * @module RequestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Validation } from '../validation';
import { Validator } from '../validation/paramValidator';
import 'reflect-metadata';
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
export declare function RequestQuery(key: string): ParameterDecorator;
export declare function RequestQuery(key: string, validations: Validation<any> | Validator | Array<Validation<any> | Validator>): ParameterDecorator;
export declare function RequestQuery(fields: {
    [key: string]: Validation<any> | Validator | Array<Validation<any> | Validator> | null;
}): ParameterDecorator;
export declare function RequestQuery(target: Object, propertyKey: string, parameterIndex: number): void;
