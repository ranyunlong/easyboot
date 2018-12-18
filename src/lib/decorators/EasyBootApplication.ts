/**
 * @module EasyBootApplication
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CType } from './Module'
import { MetadataEnums } from '../enums';

export function EasyBootApplication(metadata: CType): ClassDecorator {
    return (target): void => {
        Reflect.defineMetadata(MetadataEnums.Base.EASYBOOTMODULE, metadata, target)
    }
}