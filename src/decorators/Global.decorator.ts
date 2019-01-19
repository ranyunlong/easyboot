/**
 * @module Global
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MODULE } from '../constants/metadata.constant';

/**
 * Global decorator
 *
 * The decorator apply to Module.
 *
 * Example
 * ```
 * @Global
 * @Module({
 *  providers: [...],
 *  controllers: [...]
 * })
 * export class IndexController {}
 * ```
 */
export function Global<TFunction extends Function>(target: TFunction): TFunction | void {
    Reflect.defineMetadata(MODULE.GLOBAL, true, target)
}