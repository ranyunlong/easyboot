/**
 * @module Service
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { BASE } from '../constants/metadata.constant'

/**
 * Service decorator
 *
 * The decorator apply to Module.
 *
 * Example
 * ```
 * @Service
 * export class UserService {
 *     public async add() {
 *         return '1'
 *     }
 *     public save() {
 *         return;
 *     }
 * }
 * ```
 */
export function Service(global: boolean): ClassDecorator;
export function Service<TFunction extends Function>(target: TFunction): TFunction | void
export function Service(arg: any): any {
    if (typeof arg === 'boolean') {
        return <TFunction extends Function>(target: TFunction): TFunction | void => {
            Reflect.defineMetadata(BASE.GLOBAL_SERVICE, true, target);
            Reflect.defineMetadata(BASE.SERVICE, true, target);
        }
    } else if (typeof arg === 'function') {
        Reflect.defineMetadata(BASE.SERVICE, true, arg);
    }
}