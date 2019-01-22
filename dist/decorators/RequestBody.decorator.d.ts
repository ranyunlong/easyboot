/**
 * @module RequestBody
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
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
export declare function RequestBody(key: string): ParameterDecorator;
export declare function RequestBody(fields: {
    [key: string]: Validation | Validator | Array<Validation | Validator> | null | false;
}): ParameterDecorator;
export declare function RequestBody(key: string, validations: Validation | Validator | Array<Validation | Validator>): ParameterDecorator;
export declare function RequestBody(target: Object, propertyKey: string, parameterIndex: number): void;
