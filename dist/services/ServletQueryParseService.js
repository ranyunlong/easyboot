"use strict";
/**
 * @class ServletQueryParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ServletService_1 = require("../core/ServletService");
class ServletQueryParseService extends ServletService_1.ServletService {
    async onLaunch(metadata) {
        return metadata.context.query;
    }
}
exports.ServletQueryParseService = ServletQueryParseService;
//# sourceMappingURL=ServletQueryParseService.js.map