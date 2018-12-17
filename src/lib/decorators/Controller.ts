import { MetadataEnums } from '../enums';
import { StackTrace } from '../StackTrace/StackTrace';

/**
 * @module Controller
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export function Controller<TFunction extends Function>(target: TFunction): TFunction | void {
    StackTrace.defineController(target)
    Reflect.defineMetadata(MetadataEnums.Controller.IS_CONTROLLER, true, target)
}