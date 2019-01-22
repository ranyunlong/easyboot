/**
 * @module ContentType
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER } from '../constants/metadata.constant';
import { contentType } from 'mime-types'
import { DevStackTrace } from '../core/DevStackTrace';

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
export function ContentType(type: string): MethodDecorator {
    return (target: Object, propertyKey: string): void => {
        const trace = new DevStackTrace(`Invalid decorator: @ContentType('${type}'), '${type}' is not mime-type.`, {
            value: 'ContentType',
            scopes: [
                'entity.name.function.ts',
                'meta.function-call.ts',
                'meta.decorator.ts',
                'meta.class.ts'
            ]
        })
        if (!contentType(type)) {
            trace.throw()
        }
        Reflect.defineMetadata(CONTROLLER.CONTENT_TYPE, contentType(type), target.constructor, propertyKey)
    }
}