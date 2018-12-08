import { CType } from './Module'
import { MetadataElementTypes } from '../enums';

/**
 * @module EasyBootApplication
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export function EasyBootApplication(metadata: CType): ClassDecorator {
    return (target): void => {
        Reflect.defineMetadata(MetadataElementTypes.Metadata.EASYBOOTMODULE, metadata, target)
    }
}