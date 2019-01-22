/**
 * @class SessionService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { Session } from '../core/Session';
import { SessionStore } from '../core/SessionStore';
import { ServletService } from '../core/ServletService';
import { ServiceMetadata } from '../core/ServiceMetadata';

export class ServletSessionService extends ServletService {
    public readonly store: SessionStore;
    constructor(
        public options: Options
    ) {
        super('session')
        this.options = {
            key: 'easyboot:sess',
            signed: false,
            maxAge: 1000000,
            store: new SessionStore(),
            httpOnly: true,
            overwrite: false,
            ...options
        }
        this.store = this.options.store
    }

    public async onLaunch(metadata: ServiceMetadata): Promise<undefined | false | object> {
        const { context } = metadata
        const { options, store } = this
        let sessions: any = {};
        const sid = context.cookies.get(options.key, options);
        if (sid) sessions = await store.get(sid)
        context.session = new Session(sessions)
        return context.session
    }

    public async onBeforeDestroy(metadata: ServiceMetadata) {
        const { context } = metadata
        const { options, store } = this
        const { maxAge } = options
        const sessions = context.session || {}
        if (typeof sessions === 'object' && !Array.isArray(sessions) && Object.keys(sessions).length > 0) {
            const sid = context.cookies.get(options.key, options)
            const ssid = await store.set(sessions, {sid, maxAge})
            context.cookies.set(options.key, ssid, options)
        }
    }
}

interface Options {
    /**
     * a string for store session id in cookie
     */
    key?: string;

    /**
     * a boolean indicating whether the cookie is to be signed (false by default).
     * If this is true, another cookie of the same name with the .sig suffix
     * appended will also be sent, with a 27-byte url-safe base64 SHA1 value
     * representing the hash of cookie-name=cookie-value against the first Keygrip key.
     * This signature key is used to detect tampering the next time a cookie is received.
     */
    signed: boolean;

    /**
     * a number representing the milliseconds from Date.now() for expiry
     */
    maxAge?: number;

    /**
     *  a class for custom store (extend {SessionStore}, func: #get(sid), #set(session, opts)
     */
    store?: SessionStore;

    /**
     * a Date object indicating the cookie's expiration
     * date (expires at the end of session by default).
     */
    expires?: Date;

    /**
     *  a string indicating the path of the cookie (/ by default).
     */
    path?: string;

    /**
     * a string indicating the domain of the cookie (no default).
     */
    domain?: string;

    /**
     * a boolean indicating whether the cookie is only to be sent
     * over HTTPS (false by default for HTTP, true by default for HTTPS).
     */
    secure?: boolean;

    /**
     * "secureProxy" option is deprecated; use "secure" option, provide "secure" to constructor if needed
     */
    secureProxy?: boolean;

    /**
     * a boolean indicating whether the cookie is only to be sent over HTTP(S),
     * and not made available to client JavaScript (true by default).
     */
    httpOnly?: boolean;

    /**
     * a boolean or string indicating whether the cookie is a "same site" cookie (false by default).
     * This can be set to 'strict', 'lax', or true (which maps to 'strict').
     */
    sameSite?: 'strict' | 'lax' | boolean;

    /**
     * a boolean indicating whether to overwrite previously set
     * cookies of the same name (false by default). If this is true,
     * all cookies set during the same request with the same
     * name (regardless of path or domain) are filtered out of
     * the Set-Cookie header when setting this cookie.
     */
    overwrite?: boolean;
}