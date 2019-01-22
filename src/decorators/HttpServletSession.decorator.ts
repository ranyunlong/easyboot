/**
 * @module Service
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER, BASE } from '../constants/metadata.constant'
import { Session } from '../core/Session';
import { DevStackTrace } from '../core/DevStackTrace';

export function HttpServletSession(target: Object, propertyKey: string, parameterIndex: number): void {
    const paramtypes = Reflect.getMetadata(BASE.PARAMTYPES, target, propertyKey)
    const trace = new DevStackTrace('Invalid decorator @HttpServletSession, param type must be use Session.', {
        value: 'HttpServletSession',
        scopes: [
            'meta.class.ts',
            'meta.parameters.ts',
            'meta.method.declaration.ts',
            'variable.other.readwrite.ts',
            'meta.decorator.ts'
        ]
    })
    if (Array.isArray(paramtypes)) {
        if (paramtypes[parameterIndex] !== Session) {
            trace.throw()
        }
    }
    Reflect.defineMetadata(CONTROLLER.SESSION, {
        index: parameterIndex,
        key: propertyKey
    }, target.constructor, propertyKey)
}