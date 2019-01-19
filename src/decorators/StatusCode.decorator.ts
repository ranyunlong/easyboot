/**
 * @module StatusCode
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER } from '../constants/metadata.constant'

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
export function StatusCode(statusCode: number): MethodDecorator {
    return (target: Object, propertyKey: string): void => {
        Reflect.defineMetadata(CONTROLLER.STATUS_CODE, statusCode, target.constructor, propertyKey)
    }
}