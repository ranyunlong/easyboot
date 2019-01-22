"use strict";
/**
 * @class ServletParamParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ServletService_1 = require("../core/ServletService");
class ServletParamParseService extends ServletService_1.ServletService {
    async onLaunch(metadata) {
        const { context, data } = metadata;
        const { keys, regexp } = data;
        const params = {};
        const pathParams = regexp.exec(context.path);
        keys.forEach((k, i) => {
            params[k.name] = pathParams[i + 1];
        });
        return params;
    }
}
exports.ServletParamParseService = ServletParamParseService;
//# sourceMappingURL=ServletParamParseService.js.map