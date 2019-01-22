/**
 * @module Injectable
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
/**
 * Injectable decorator
 *
 * The decorator apply to any class.
 *
 * Example
 * ```
 * @Injectable
 * export class IndexController {}
 * ```
 */
export declare function Injectable<TFunction extends Function>(target: TFunction): TFunction | void;
