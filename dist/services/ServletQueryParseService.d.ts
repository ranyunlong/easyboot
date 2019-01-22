/**
 * @class ServletQueryParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { ServletService } from '../core/ServletService';
import { ServiceMetadata } from '../core/ServiceMetadata';
export declare class ServletQueryParseService extends ServletService {
    onLaunch(metadata: ServiceMetadata): Promise<undefined | false | object>;
}
