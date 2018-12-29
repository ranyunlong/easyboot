/**
 * @module Injectable
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums } from '../enums';

export function Injectable<TFunction extends Function>(target: TFunction): TFunction | void {
    Reflect.defineMetadata(MetadataEnums.Base.INJECTABLE, true, target)
}