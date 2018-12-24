/**
 * @module HttpServletResponse
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata';
/**
 * HttpServletResponse decorator
 *
 * The decorator apply to Contorllor handler.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@HttpServletResponse response: Request) {
 *        response.type = 'application/json'
 *        response.status = 200
 *        return {}
 *     }
 * }
 * ```
 */
export declare function HttpServletResponse(target: Object, propertyKey: string, parameterIndex: number): void;
