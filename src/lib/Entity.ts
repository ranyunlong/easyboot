import { EasyBootEntityConstructor } from './EasyBootEntity';

/**
 * @class EasyBootServletConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export function Entity<T extends EasyBootEntityConstructor>(target: T): void {
    target.prototype.$type = 'entity'
    console.log(target.prototype.$rules)
}