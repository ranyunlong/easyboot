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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldFBhcmFtUGFyc2VTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL1NlcnZsZXRQYXJhbVBhcnNlU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsMkRBQXdEO0FBR3hELE1BQWEsd0JBQXlCLFNBQVEsK0JBQWM7SUFDakQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUF3QztRQUMxRCxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQTtRQUNsQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUM3QixNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUE7UUFDdEIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDdEMsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLE1BQU0sQ0FBQTtJQUNqQixDQUFDO0NBQ0o7QUFYRCw0REFXQyJ9