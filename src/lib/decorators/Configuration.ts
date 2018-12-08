import { CType } from './Module'
import { MetadataElementTypes } from '../enums';

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
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping('admin')
 *     public async index(){}
 * }
 * ```
 */
export function Configuration(metadata: CType): ClassDecorator {
    return (target): void => {
        Reflect.defineMetadata(MetadataElementTypes.Metadata.CONFIGURATION, metadata, target)
    }
}