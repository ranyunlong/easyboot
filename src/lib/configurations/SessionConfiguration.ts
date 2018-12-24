/**
 * @class SessionConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { SessionStore } from '../core';

export class SessionConfiguration {

    /**
     * a string for store session id in cookie
     */
    public key?: string;

    /**
     * a boolean indicating whether the cookie is to be signed (false by default).
     * If this is true, another cookie of the same name with the .sig suffix
     * appended will also be sent, with a 27-byte url-safe base64 SHA1 value
     * representing the hash of cookie-name=cookie-value against the first Keygrip key.
     * This signature key is used to detect tampering the next time a cookie is received.
     */
    public signed: boolean = true;

    /**
     * a number representing the milliseconds from Date.now() for expiry
     */
    public maxAge?: number = 1000000;

    /**
     *  a class for custom store (extend {SessionStore}, func: #get(sid), #set(session, opts)
     */
    public store?: SessionStore = new SessionStore()

    /**
     * a Date object indicating the cookie's expiration
     * date (expires at the end of session by default).
     */
    public expires?: Date;

    /**
     *  a string indicating the path of the cookie (/ by default).
     */
    public path?: string = '/'

    /**
     * a string indicating the domain of the cookie (no default).
     */
    public domain?: string = 'localhost:3000'

    /**
     * a boolean indicating whether the cookie is only to be sent
     * over HTTPS (false by default for HTTP, true by default for HTTPS).
     */
    public secure?: boolean;

    /**
     * "secureProxy" option is deprecated; use "secure" option, provide "secure" to constructor if needed
     */
    public secureProxy?: boolean;

    /**
     * a boolean indicating whether the cookie is only to be sent over HTTP(S),
     * and not made available to client JavaScript (true by default).
     */
    public httpOnly?: boolean = true;

    /**
     * a boolean or string indicating whether the cookie is a "same site" cookie (false by default).
     * This can be set to 'strict', 'lax', or true (which maps to 'strict').
     */
    public sameSite?: 'strict' | 'lax' | boolean;

    /**
     * a boolean indicating whether to overwrite previously set
     * cookies of the same name (false by default). If this is true,
     * all cookies set during the same request with the same
     * name (regardless of path or domain) are filtered out of
     * the Set-Cookie header when setting this cookie.
     */
    public overwrite: boolean = false;
}