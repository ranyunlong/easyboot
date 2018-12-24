import 'reflect-metadata';
/**
 * StatusCode decorator
 *
 * The decorator apply to Contorllor propertys, use to set response status code.
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
 *     @StatusCode(400)
 *     public async test(){}
 *
 *     @GetMapping
 *     @StatusCode(300)
 *     public async test1(){}
 * }
 * ```
 */
export declare function StatusCode(statusCode: number): MethodDecorator;
/**
 * StatusMessage decorator
 *
 * The decorator apply to Contorllor propertys, use to set response status message.
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
 *     @StatusMessage('Success')
 *     public async test(){}
 *
 *     @GetMapping
 *     @StatusMessage('Fail')
 *     public async test1(){}
 * }
 * ```
 */
export declare function StatusMessage(statusCode: string): MethodDecorator;
