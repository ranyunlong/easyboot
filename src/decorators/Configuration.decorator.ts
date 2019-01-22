/**
 * @module Configuration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { BASE } from '../constants/metadata.constant';
import { Ctor } from '../core/Servlet';
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