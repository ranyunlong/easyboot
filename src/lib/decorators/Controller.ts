import { MetadataEnums } from '../enums';

/**
 * @module Controller
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export function Controller<TFunction extends Function>(target: TFunction): TFunction | void {
    Reflect.defineMetadata(MetadataEnums.Metadata.IS_CONTROLLER, true, target)
}