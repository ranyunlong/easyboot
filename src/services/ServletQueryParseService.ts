/**
 * @class ServletQueryParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { ServletService } from '../core/ServletService';
import { ServiceMetadata } from '../core/ServiceMetadata';

export class ServletQueryParseService extends ServletService {
    public async onLaunch(metadata: ServiceMetadata): Promise<undefined | false | object> {
        return metadata.context.query
    }
}