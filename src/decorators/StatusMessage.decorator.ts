/**
 * @module StatusCode
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER } from '../constants/metadata.constant'

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
export function StatusMessage(statusCode: string): MethodDecorator {
    return (target: Object, propertyKey: string): void => {
        Reflect.defineMetadata(CONTROLLER.STATUS_MESSAGE, statusCode, target.constructor, propertyKey)
    }
}