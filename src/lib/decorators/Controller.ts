import { MetadataElementTypes } from '../enums';
import { DecoratorException } from '../exception';

/**
 * @module Controller
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export function Controller<TFunction extends Function>(target: TFunction): TFunction | void {
    Reflect.defineMetadata(MetadataElementTypes.Metadata.EXCEPTION_TRACE, new DecoratorException(), target)
    Reflect.defineMetadata(MetadataElementTypes.Metadata.IS_CONTROLLER, true, target)
}