/**
 * @module Service
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
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
export declare function Service(global: boolean): ClassDecorator;
export declare function Service<TFunction extends Function>(target: TFunction): TFunction | void;
