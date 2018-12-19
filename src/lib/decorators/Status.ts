/**
 * @module Status
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { MetadataEnums } from '../enums';

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
        Reflect.defineMetadata(MetadataEnums.Controller.STATUS_CODE, statusCode, target.constructor, propertyKey)
    }
}

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
        Reflect.defineMetadata(MetadataEnums.Controller.STATUS_MESSAGE, statusCode, target.constructor, propertyKey)
    }
}