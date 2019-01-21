/**
 * @class SessionService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { Session } from '../core/Session';
import { Servlet } from 'src/core/Servlet';
import { ServletContext } from 'src/core/ServletContext';
import { SessionStore } from 'src/core/SessionStore';
import { SessionConfiguration } from 'src/configurations/SessionConfiguration';
import * as Keygrip from 'keygrip'

export class SessionService {
    public readonly store: SessionStore;
    constructor(
        public readonly Application: Servlet,
        public readonly options: SessionConfiguration
    ) {
        this.options.key = options.key || 'easyboot'
        this.store = options.store || new SessionStore()
    }

    public async get(context: ServletContext) {
        const { options, store } = this
        let sessions: any = {};
        const sid = context.cookies.get(options.key, options);
        if (sid) sessions = await store.get(sid)
        context.session = new Session(sessions)
    }

    public async set(context: ServletContext) {
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