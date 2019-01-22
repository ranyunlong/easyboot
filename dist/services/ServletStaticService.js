"use strict";
/**
 * @class ServletStaticService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const send_1 = require("../utils/send");
const ServletService_1 = require("../core/ServletService");
class ServletStaticService extends ServletService_1.ServletService {
    constructor(options) {
        super('staic-serve');
        this.options = options;
    }
    async onBeforeController(metadata) {
        if (this.options.defer)
            return;
        const { context } = metadata;
        if (context.finished || context.headerSent || !context.writable || context.response.body)
            return;
        if (context.method === 'HEAD' || context.method === 'GET') {
            try {
                await send_1.default(context, context.path, this.options);
            }
            catch (err) {
                if (err.status !== 404) {
                    throw err;
                }
            }
        }
    }
    async onAfterController(metadata) {
        if (!this.options.defer)
            return;
        const { context } = metadata;
        if (context.finished || context.headerSent || !context.writable || context.response.body)
            return;
        if (context.method !== 'HEAD' && context.method !== 'GET')
            return;
        // response is already handled
        if (context.response.body != null || context.status === 404)
            return;
        try {
            await send_1.default(context, context.path, this.options);
        }
        catch (err) {
            if (err.status !== 404) {
                throw err;
            }
        }
    }
}
exports.ServletStaticService = ServletStaticService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldFN0YXRpY1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvU2VydmxldFN0YXRpY1NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILHdDQUFnQztBQUNoQywyREFBd0Q7QUFLeEQsTUFBYSxvQkFBcUIsU0FBUSwrQkFBYztJQUNwRCxZQUFtQixPQUFzQjtRQUNyQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7UUFETCxZQUFPLEdBQVAsT0FBTyxDQUFlO0lBRXpDLENBQUM7SUFFTSxLQUFLLENBQUMsa0JBQWtCLENBQUMsUUFBeUI7UUFDckQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQy9CLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUE7UUFDNUIsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSTtZQUFFLE9BQU87UUFDakcsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtZQUN2RCxJQUFJO2dCQUNBLE1BQU0sY0FBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTthQUNsRDtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNWLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7b0JBQ3BCLE1BQU0sR0FBRyxDQUFBO2lCQUNaO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsaUJBQWlCLENBQUMsUUFBeUI7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztZQUFFLE9BQU87UUFDaEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQTtRQUM1QixJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBQUUsT0FBTztRQUNqRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSztZQUFFLE9BQU87UUFDbEUsOEJBQThCO1FBQzlCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssR0FBRztZQUFFLE9BQU87UUFDcEUsSUFBSTtZQUNBLE1BQU0sY0FBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUNsRDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDdEIsTUFBTSxHQUFHLENBQUE7YUFDVjtTQUNKO0lBQ0wsQ0FBQztDQUNKO0FBbkNELG9EQW1DQyJ9