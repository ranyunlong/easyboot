/**
 * @module Controller
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums } from '../enums';
import { StackTrace } from '../StackTrace/StackTrace';

/**
 * Controller decorator
 *
 * The decorator apply to Contorllor.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public index(@HttpServletRequest request: Request) {
 *        return request.method
 *     }
 * }
 * ```
 */
export function Controller<TFunction extends Function>(target: TFunction): TFunction | void {
    StackTrace.defineController(target)
    Reflect.defineMetadata(MetadataEnums.Controller.IS_CONTROLLER, true, target)
}