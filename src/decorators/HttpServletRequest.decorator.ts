/**
 * @module HttpServletRequest
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER, BASE } from '../constants/metadata.constant';
import { DevStackTace } from '../core/DevStackTace';
import { ServletRequest } from '../core/ServletRequest'

export function HttpServletRequest(target: Object, propertyKey: string, parameterIndex: number): void {
    const paramtypes = Reflect.getMetadata(BASE.PARAMTYPES, target, propertyKey)
    const tace = new DevStackTace('Invalid decorator: @HttpServletRequest, param type must be ServletRequest.', 'meta.decorator.ts', 'HttpServletRequest')
    if (paramtypes[parameterIndex] !== ServletRequest) {
        tace.throw()
    }
    Reflect.defineMetadata(CONTROLLER.REQUEST, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey)
}