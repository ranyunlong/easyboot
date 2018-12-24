"use strict";
/**
 * @class SessionService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const SessionStore_1 = require("../SessionStore");
const Session_1 = require("../Session");
class SessionService {
    constructor(Application, options) {
        this.Application = Application;
        this.options = options;
        this.options.key = this.Application.keys[0] || 'easyboot:sess';
        this.store = options.store || new SessionStore_1.SessionStore();
    }
    async get(context) {
        const { options, store } = this;
        let sessions = {};
        const sid = context.cookies.get(options.key, options);
        if (sid)
            sessions = await store.get(sid);
        context.session = new Session_1.Session(sessions);
    }
    async set(context) {
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
exports.SessionService = SessionService;
