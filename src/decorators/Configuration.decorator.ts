/**
 * @module Configuration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { Ctor } from '../types/index.api';
import { BASE } from '../constants/metadata.constant';
/**
 * Configuration decorator
 *
 * The decorator apply EasyBootServlet application.
 *
 * Example
 * ```
 * @Configuration(ApplicationConfig)
 * export class Application extends HttpServlet {
 *    public async run(context: Context) {}
 * }
 * ```
 */
export function Configuration(metadata: Ctor): ClassDecorator {
    return (target): void => {
        Reflect.defineMetadata(BASE.CONFIGURATION, metadata, target)
    }
}