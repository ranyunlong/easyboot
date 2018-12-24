/**
 * @module RequestParam
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Validation } from '../validation';
import { Validator } from '../validation/paramValidator';
import 'reflect-metadata';
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
export declare function RequestParam(fields: {
    [key: string]: Validation<any> | Validator | Array<Validation<any> | Validator> | null;
}): ParameterDecorator;
export declare function RequestParam(key: string): ParameterDecorator;
export declare function RequestParam(key: string, validations: Validation<any> | Validator | Array<Validation<any> | Validator>): ParameterDecorator;
export declare function RequestParam(target: Object, propertyKey: string, parameterIndex: number): void;
