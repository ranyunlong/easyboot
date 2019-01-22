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
//# sourceMappingURL=ServletSessionService.js.map