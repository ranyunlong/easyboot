/**
 * @class SessionService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { Context } from '../Context';
import { SessionStore } from '../SessionStore';
import { EasyBootServlet } from '../EasyBootServlet';
import { Session } from '../Session';
import { SessionConfiguration } from '../../configurations';

export class SessionService {
    public readonly store: SessionStore;
    constructor(
        public readonly Application: EasyBootServlet,
        public readonly options: SessionConfiguration
    ) {
        this.options.key = this.Application.keys[0] || 'easyboot:sess'
        this.store = options.store || new SessionStore()
    }

    public async get(context: Context) {
        const { options, store } = this
        let sessions: any = {}
        const sid = context.cookies.get(options.key, options);
        if (sid) sessions = await store.get(sid)
        context.session = new Session(sessions)
    }

    public async set(context: Context) {
        const { options, store } = this
        const { maxAge } = options
        const sessions = context.session || {}
        if (typeof sessions === 'object' && !Array.isArray(sessions) && Object.keys(sessions).length > 0) {
            const sid = context.cookies.get(options.key, options);
            const ssid = await store.set(sessions, {sid, maxAge})
            context.cookies.set(options.key, ssid, options)
        }
    }
}