import { TClass } from './Module';

/**
 * @module Service
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

 export function Service<T extends TClass>(target: T): void {
   target.prototype.$type = 'service'
 }