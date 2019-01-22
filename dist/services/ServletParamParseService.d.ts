/**
 * @class ServletParamParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { ServletService } from '../core/ServletService';
import { ServiceMetadata, MetadataParam } from '../core/ServiceMetadata';
export declare class ServletParamParseService extends ServletService {
    onLaunch(metadata: ServiceMetadata<MetadataParam>): Promise<undefined | false | object>;
}
