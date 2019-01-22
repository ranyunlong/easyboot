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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldFF1ZXJ5UGFyc2VTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL1NlcnZsZXRRdWVyeVBhcnNlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsMkRBQXdEO0FBR3hELE1BQWEsd0JBQXlCLFNBQVEsK0JBQWM7SUFDakQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUF5QjtRQUMzQyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFBO0lBQ2pDLENBQUM7Q0FDSjtBQUpELDREQUlDIn0=