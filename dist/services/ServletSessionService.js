"use strict";
/**
 * @class SessionService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Session_1 = require("../core/Session");
const SessionStore_1 = require("../core/SessionStore");
const ServletService_1 = require("../core/ServletService");
class ServletSessionService extends ServletService_1.ServletService {
    constructor(options) {
        super('session');
        this.options = options;
        this.options = {
            key: 'easyboot:sess',
            signed: false,
            maxAge: 1000000,
            store: new SessionStore_1.SessionStore(),
            httpOnly: true,
            overwrite: false,
            ...options
        };
        this.store = this.options.store;
    }
    async onLaunch(metadata) {
        const { context } = metadata;
        const { options, store } = this;
        let sessions = {};
        const sid = context.cookies.get(options.key, options);
        if (sid)
            sessions = await store.get(sid);
        context.session = new Session_1.Session(sessions);
        return context.session;
    }
    async onBeforeDestroy(metadata) {
        const { context } = metadata;
        const { options, store } = this;
        const { maxAge } = options;
        const sessions = context.session || {};
        if (typeof sessions === 'object' && !Array.isArray(sessions) && Object.keys(sessions).length > 0) {
            const sid = context.cookies.get(options.key, options);
            const ssid = await store.set(sessions, { sid, maxAge });
            context.cookies.set(options.key, ssid, options);
        }
    }
}
exports.ServletSessionService = ServletSessionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldFNlc3Npb25TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL1NlcnZsZXRTZXNzaW9uU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsNkNBQTBDO0FBQzFDLHVEQUFvRDtBQUNwRCwyREFBd0Q7QUFHeEQsTUFBYSxxQkFBc0IsU0FBUSwrQkFBYztJQUVyRCxZQUNXLE9BQWdCO1FBRXZCLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUZULFlBQU8sR0FBUCxPQUFPLENBQVM7UUFHdkIsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNYLEdBQUcsRUFBRSxlQUFlO1lBQ3BCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLE9BQU87WUFDZixLQUFLLEVBQUUsSUFBSSwyQkFBWSxFQUFFO1lBQ3pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsR0FBRyxPQUFPO1NBQ2IsQ0FBQTtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7SUFDbkMsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBeUI7UUFDM0MsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQTtRQUM1QixNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQTtRQUMvQixJQUFJLFFBQVEsR0FBUSxFQUFFLENBQUM7UUFDdkIsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0RCxJQUFJLEdBQUc7WUFBRSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3hDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3ZDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQTtJQUMxQixDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxRQUF5QjtRQUNsRCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsUUFBUSxDQUFBO1FBQzVCLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQy9CLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUE7UUFDMUIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7UUFDdEMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM5RixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3JELE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtZQUNyRCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNsRDtJQUNMLENBQUM7Q0FDSjtBQXZDRCxzREF1Q0MifQ==