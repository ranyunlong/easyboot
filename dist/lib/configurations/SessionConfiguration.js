"use strict";
/**
 * @class SessionConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
class SessionConfiguration {
    constructor() {
        /**
         * a boolean indicating whether the cookie is to be signed (false by default).
         * If this is true, another cookie of the same name with the .sig suffix
         * appended will also be sent, with a 27-byte url-safe base64 SHA1 value
         * representing the hash of cookie-name=cookie-value against the first Keygrip key.
         * This signature key is used to detect tampering the next time a cookie is received.
         */
        this.signed = true;
        /**
         * a number representing the milliseconds from Date.now() for expiry
         */
        this.maxAge = 1000000;
        /**
         *  a class for custom store (extend {SessionStore}, func: #get(sid), #set(session, opts)
         */
        this.store = new core_1.SessionStore();
        /**
         *  a string indicating the path of the cookie (/ by default).
         */
        this.path = '/';
        /**
         * a string indicating the domain of the cookie (no default).
         */
        this.domain = 'localhost:3000';
        /**
         * a boolean indicating whether the cookie is only to be sent over HTTP(S),
         * and not made available to client JavaScript (true by default).
         */
        this.httpOnly = true;
        /**
         * a boolean indicating whether to overwrite previously set
         * cookies of the same name (false by default). If this is true,
         * all cookies set during the same request with the same
         * name (regardless of path or domain) are filtered out of
         * the Set-Cookie header when setting this cookie.
         */
        this.overwrite = false;
    }
}
exports.SessionConfiguration = SessionConfiguration;
