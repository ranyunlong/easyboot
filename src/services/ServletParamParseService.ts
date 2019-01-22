/**
 * @class ServletParamParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { ServletService } from '../core/ServletService';
import { ServiceMetadata, MetadataParam } from '../core/ServiceMetadata';

export class ServletParamParseService extends ServletService {
    public async onLaunch(metadata: ServiceMetadata<MetadataParam>): Promise<undefined | false | object> {
        const { context, data } = metadata
        const { keys, regexp } = data
        const params: any = {}
        const pathParams = regexp.exec(context.path)
        keys.forEach((k, i) => {
            params[k.name] = pathParams[i + 1]
        })
        return params
    }
}