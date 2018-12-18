import { CType } from './Module'
import { MetadataEnums } from '../enums';
import { StackTrace } from '../StackTrace/StackTrace';

/**
 * @module Configuration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

/**
 * Configuration decorator
 *
 * The decorator apply EasyBootServlet application.
 *
 * Example
 * ```
 * @Configuration(ApplicationConfig)
 * export class Application extends EasyBootServlet {
 *    public async run(context: Context) {}
 * }
 * ```
 */
export function Configuration(metadata: CType): ClassDecorator {
    return (target): void => {
        Reflect.defineMetadata(MetadataEnums.Base.CONFIGURATION, metadata, target)
    }
}