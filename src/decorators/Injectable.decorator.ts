/**
 * @module Injectable
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { BASE } from '../constants/metadata.constant';

export function Injectable<TFunction extends Function>(target: TFunction): TFunction | void {
    Reflect.defineMetadata(BASE.INJECTABLE, true, target)
}