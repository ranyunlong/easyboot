/**
 * @module Controller
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata';
/**
 * Controller decorator
 *
 * The decorator apply to Contorllor.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@HttpServletRequest request: Request) {
 *        return request.method
 *     }
 * }
 * ```
 */
export declare function Controller<TFunction extends Function>(target: TFunction): TFunction | void;
