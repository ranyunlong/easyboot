/**
 * @module ContentType
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
/**
 * ContentType decorator
 *
 * The decorator apply to Contorllor propertys, use to set response content type.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public async index(){}
 *
 *     @GetMapping
 *     @ContentType('application/json')
 *     public async test(){}
 *
 *     @GetMapping
 *     @ContentType('text/html')
 *     public async test1(){}
 * }
 * ```
 */
export declare function ContentType(type: string): MethodDecorator;