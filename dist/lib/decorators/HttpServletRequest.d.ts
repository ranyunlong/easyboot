/**
 * @module HttpServletRequest
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata';
/**
 * HttpServletRequest decorator
 *
 * The decorator apply to Contorllor handler.
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
export declare function HttpServletRequest(target: Object, propertyKey: string, parameterIndex: number): void;
