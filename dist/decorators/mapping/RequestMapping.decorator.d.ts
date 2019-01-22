/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { RequestEnum } from '../../enums/request.mapping.enum';
/**
 * RequestMapping decorator
 *
 * The decorator apply to Contorllor or Contorllor propertys, Used to route.
 * Request method ALL (any)
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping('admin/:id')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping('admin/:id')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping(':id')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping(':id/:name')
 * export class IndexController {}
 * ```
 */
interface RequestMappingDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
    <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
}
export declare function RequestMapping(path: string, method?: RequestEnum.Methods): RequestMappingDecorator;
export { CopyMapping } from './CopyMapping.decorator';
export { DeleteMapping } from './DeleteMapping.decorator';
export { GetMapping } from './GetMapping.decorator';
export { HeadMapping } from './HeadMapping.decorator';
export { LinkMapping } from './LinkMapping.decorator';
export { LockMapping } from './LockMapping.decorator';
export { OptionsMapping } from './OptionsMapping.decorator';
export { PatchMapping } from './PatchMapping.decorator';
export { PostMapping } from './PostMapping.decorator';
export { PropfindMapping } from './PropfindMapping.decorator';
export { PurgeMapping } from './PurgeMapping.decorator';
export { PutMapping } from './PutMapping.decorator';
export { UnlinkMapping } from './UnlinkMapping.decorator';
export { UnlockMapping } from './UnlockMapping.decorator';
export { ViewMapping } from './ViewMapping.decorator';
