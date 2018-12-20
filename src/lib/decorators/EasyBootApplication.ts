/**
 * @module EasyBootApplication
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CType } from './Module'
import { MetadataEnums } from '../enums';

/**
 * EasyBootApplication decorator
 *
 * The decorator apply to EasyBootApplication.
 *
 * Example
 * ```
 * @Configuration(ApplicationConfig)
 * @EasyBootApplication(RootModule)
 * export class Application extends EasyBootServlet {
 * }
 *
 * new Application()
 * ```
 */
export function EasyBootApplication(metadata: CType): ClassDecorator {
    return (target): void => {
        Reflect.defineMetadata(MetadataEnums.Base.EASYBOOTMODULE, metadata, target)
    }
}