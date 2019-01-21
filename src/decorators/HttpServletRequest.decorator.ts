/**
 * @module HttpServletRequest
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER, BASE } from '../constants/metadata.constant';
import { DevStackTrace } from '../core/DevStackTrace';
import { ServletRequest } from '../core/ServletRequest'

export function HttpServletRequest(target: Object, propertyKey: string, parameterIndex: number): void {
    const paramtypes = Reflect.getMetadata(BASE.PARAMTYPES, target, propertyKey)
    const trace = new DevStackTrace('Invalid decorator: @HttpServletRequest, param type must be ServletRequest.', {
        value: 'HttpServletRequest',
        scopes: ['meta.decorator.ts']
    })
    if (paramtypes[parameterIndex] !== ServletRequest) {
        trace.throw()
    }
    Reflect.defineMetadata(CONTROLLER.REQUEST, {
        index: parameterIndex,
        propertyKey
    }, target.constructor, propertyKey)
}