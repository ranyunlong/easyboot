"use strict";
/**
 * @class ServletResponse
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const stream_1 = require("stream");
const path = require("path");
const mime = require("mime-types");
const vary = require("vary");
const typeIs = require("type-is");
const disposition = require("content-disposition");
const statuses = require("statuses");
const onFinish = require("on-finished");
const escape = require("escape-html");
const destroy = require("destroy");
const utils_2 = require("./utils");
class ServletResponse {
    constructor(req, res, app) {
        this.req = req;
        this.res = res;
        this.app = app;
        const { version } = require('../../package.json');
        this.set('Server', `easyboot:${version}`);
        this.vary('Accept-Encoding');
    }
    /**
     * @property socket
     * Return the request socket.
     */
    get socket() {
        return this.res.socket;
    }
    /**
     * @property header
     * Return response header, alias as response.header
     */
    get header() {
        return this.res.getHeaders();
    }
    /**
     * @property headers
     * Return response header, alias as response.header
     */
    get headers() {
        return this.res.getHeaders();
    }
    /**
     * @property lastModified
     * Get the Last-Modified date in Date form, if it exists.
     */
    get lastModified() {
        const s = this.get('Last-Modified');
        return new Date(s);
    }
    /**
     * @property lastModified
     * Set the Last-Modified date using a string or a Date.
     */
    set lastModified(val) {
        this.set('Last-Modified', val.toUTCString());
    }
    /**
     * @property length
     * Return parsed response Content-Length when present.
     */
    get length() {
        let length = this.get('Content-Length');
        if (!length) {
            if (!this.body)
                return null;
            if (typeof this.body === 'string') {
                return Buffer.byteLength(this.body);
            }
            if (Buffer.isBuffer(this.body)) {
                return this.body.byteLength;
            }
            if (this.body instanceof Object) {
                return Buffer.byteLength(JSON.stringify(this.body));
            }
        }
        // ~~ format length to number
        return ~~length;
    }
    /**
     * @property length
     * Set Content-Length field to `val`
     */
    set length(val) {
        this.set('Content-Length', val.toString());
    }
    /**
     * @property writable
     * Checks if the request is writable.
     * Tests for the existence of the socket
     * as node sometimes does not set it.
     */
    get writable() {
        if (this.finished)
            return false;
        const socket = this.socket;
        if (!socket)
            return true;
        const res = this.res;
        return res.writable;
    }
    /**
     * @property headerSent
     * Check if a header has been written to the socket.
     */
    get headerSent() {
        return this.res.headersSent;
    }
    /**
     * @property finished
     * Return response finished
     */
    get finished() {
        return this.res.finished;
    }
    /**
     * @property status
     * Get response status code.
     */
    get status() {
        return this.res.statusCode;
    }
    /**
     * @property status
     * Set response status code.
     */
    set status(val) {
        this._explicitStatus = true;
        this.res.statusCode = val;
        if (this.req.httpVersionMajor < 2)
            this.res.statusMessage = statuses[val];
        if (this.body && statuses.empty[val])
            this.body = null;
    }
    /**
     * @property type
     * Set Content-Type response header with `type` through `mime.contentType()`
     */
    set type(val) {
        val = utils_2.getType(val);
        if (val) {
            this.set('Content-Type', val);
        }
        else {
            this.remove('Content-Type');
        }
    }
    /**
     * @property message
     * Get response status message
     */
    get message() {
        return this.res.statusMessage || statuses[this.status];
    }
    /**
     * @property message
     * Set response status message
     */
    set message(val) {
        this.res.statusMessage = val;
    }
    /**
     * @property body
     * Get response body.
     */
    get body() {
        return this._body;
    }
    /**
     * @property body
     * Set response body.
     */
    set body(val) {
        if (this.finished)
            return;
        const original = this._body;
        this._body = val;
        // no content
        if (null == val) {
            if (!statuses.empty[this.status])
                this.status = 204;
            this.remove('Content-Type');
            this.remove('Content-Length');
            this.remove('Transfer-Encoding');
            return;
        }
        // set the status
        if (!this._explicitStatus)
            this.status = 200;
        // set the content-type only if not yet set
        const setType = !this.header['content-type'];
        // string
        if ('string' === typeof val) {
            if (setType)
                this.type = /^\s*</.test(val) ? 'html' : 'text';
            this.length = Buffer.byteLength(val);
            return;
        }
        // buffer
        if (Buffer.isBuffer(val)) {
            if (setType)
                this.type = 'bin';
            this.length = val.length;
            return;
        }
        // stream
        if (val instanceof stream_1.Stream) {
            onFinish(this.res, destroy.bind(null, val));
            utils_1.ensureErrorHandler(val, (err) => this.ctx.onerror(err));
            // overwriting
            if (null != original && original !== val)
                this.remove('Content-Length');
            if (setType)
                this.type = 'bin';
            return;
        }
        // json
        this.remove('Content-Length');
        this.type = 'json';
    }
    /**
     * Get the ETag of a response.
     */
    get etag() {
        return this.get('ETag');
    }
    /**
     * @property etag
     * Set the ETag of a response.
     * This will normalize the quotes if necessary.
     *
     *     this.response.etag = 'md5hashsum';
     *     this.response.etag = '"md5hashsum"';
     *     this.response.etag = 'W/"123456789"';
     */
    set etag(val) {
        if (!/^(W\/)?"/.test(val))
            val = `"${val}"`;
        this.set('ETag', val);
    }
    /**
     * @method
     */
    onError(err) {
        console.log(err);
    }
    /**
     * @method get
     * Return response header.
     *
     * Examples:
     *
     *     this.get('Content-Type');
     *     // => "text/plain"
     *
     *     this.get('content-type');
     *     // => "text/plain"
     */
    get(field) {
        return this.res.getHeader(field);
    }
    /**
     * @method attachment
     * Set Content-Disposition header to "attachment" with optional `filename`.
     */
    attachment(filename) {
        this.set('Content-Disposition', disposition(filename));
        const mimeType = mime.contentType(path.extname(filename));
        if (mimeType) {
            this.set('Content-Type', mimeType);
        }
    }
    set(...args) {
        const [field, val] = args;
        if (field instanceof Object) {
            Object.keys(field).forEach((k) => {
                this.res.setHeader(k, field[k]);
            });
        }
        else {
            this.res.setHeader(field, val);
        }
    }
    /**
     * @method append
     * Append additional header `field` with value `val`.
     */
    append(field, val) {
        if (!this.res.hasHeader(field)) {
            this.set(field, val);
        }
    }
    /**
     * @method remove
     * Remove header `field`.
     */
    remove(field) {
        if (this.headerSent)
            return;
        this.res.removeHeader(field);
    }
    /**
     * @method vary
     * Vary on `field`.
     */
    vary(field) {
        if (this.headerSent)
            return;
        return vary(this.res, field);
    }
    is(...types) {
        return typeIs.is(this.type, types);
    }
    /**
     * @method flushHeaders
     * Flush any set headers, and begin the body
     */
    flushHeaders() {
        const res = this.res;
        res.flushHeaders();
    }
    /**
     * @method redirect
     * Perform a 302 redirect to `url`.
     *
     * The string "back" is special-cased
     * to provide Referrer support, when Referrer
     * is not present `alt` or "/" is used.
     *
     * Examples:
     *
     *    this.redirect('back');
     *    this.redirect('back', '/index.html');
     *    this.redirect('/login');
     *    this.redirect('http://google.com');
     */
    redirect(url, alt) {
        // location
        if ('back' === url)
            url = this.ctx.get('Referrer') || alt || '/';
        this.set('Location', url);
        // status
        if (!statuses.redirect[this.status])
            this.status = 302;
        // html
        if (this.ctx.accepts('html')) {
            url = escape(url);
            this.type = mime.contentType('html');
            this.body = `Redirecting to <a href="${url}">${url}</a>.`;
            return;
        }
        // text
        this.type = 'text/plain; charset=utf-8';
        this.body = `Redirecting to ${url}.`;
    }
}
exports.ServletResponse = ServletResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldFJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvU2VydmxldFJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFHSCxtQ0FBNkM7QUFFN0MsbUNBQStCO0FBQy9CLDZCQUE0QjtBQUM1QixtQ0FBa0M7QUFDbEMsNkJBQTRCO0FBQzVCLGtDQUFpQztBQUNqQyxtREFBa0Q7QUFDbEQscUNBQW9DO0FBQ3BDLHdDQUF1QztBQUN2QyxzQ0FBcUM7QUFDckMsbUNBQW1DO0FBRW5DLG1DQUFrQztBQUlsQyxNQUFhLGVBQWU7SUFLeEIsWUFDVyxHQUFvQixFQUNwQixHQUFtQixFQUNuQixHQUFZO1FBRlosUUFBRyxHQUFILEdBQUcsQ0FBaUI7UUFDcEIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBUztRQUVuQixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUcsWUFBWSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxNQUFNO1FBQ2IsT0FBUSxJQUFJLENBQUMsR0FBVyxDQUFDLE1BQU0sQ0FBQTtJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2hDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUE7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQVcsWUFBWTtRQUNuQixNQUFNLENBQUMsR0FBVyxJ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