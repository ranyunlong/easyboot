/**
 * @module Service
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER } from '../constants/metadata.constant'

export function HttpServletSession(target: Object, propertyKey: string, parameterIndex: number): void {
    Reflect.defineMetadata(CONTROLLER.SESSION, {
        index: parameterIndex,
        key: propertyKey
    }, target.constructor, propertyKey)
}