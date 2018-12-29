/**
 * @module Entity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { MetadataEnums } from '../enums';

export function Entity<TFunction extends Function>(target: TFunction): TFunction | void  {
    Reflect.defineMetadata(MetadataEnums.Base.ENTITY, true, target)
}