/**
 * @module Controller
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata'
export function Controller(target: { new (...args: any[]): any }): void {
    const options = target.prototype
    options.$metadata = Reflect.getMetadata('design:paramtypes', target)
    options.$type = 'controller'
}