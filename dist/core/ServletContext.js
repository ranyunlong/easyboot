"use strict";
/**
 * @class ServletContext
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("util");
const Cookies = require("cookies");
const statuses = require("statuses");
const httpAssert = require("http-assert");
const httpErrors = require("http-errors");
const COOKIES = Symbol('context#cookies');
class ServletContext {
    /**
     * constructor
     * @param req IncomingMessage
     * @param res ServerResponse
     * @param request Request
     * @param response Response
     */
    constructor(req, res, request, response, app) {
        this.req = req;
        this.res = res;
        this.request = request;
        this.response = response;
        this.app = app;
        // respond state
        this.respond = true;
        /**
         * @method assert
         * Http assert
         */
        this.assert = httpAssert;
    }
    /**
     * @property writable
     * Get response writable
     */
    get writable() {
        return this.response.writable;
    }
    /**
     * @property URL
     * Get request URL
     */
    get URL() {
        return this.request.URL;
    }
    /**
     * @property finished
     * Get response state
     */
    get finished() {
        return this.response.finished;
    }
    /**
     * @property accept
     * Get request accept
     */
    get accept() {
        return this.request.accept;
    }
    /**
     * @method append
     * append response headers
     */
    append(field, val) {
        return this.response.append(field, val);
    }
    /**
     * @method attachment
     * @param filename string
     * File reponse
     */
    attachment(filename) {
        return this.response.attachment(filename);
    }
    /**
     * @property body
     * Set response body
     */
    set body(val) {
        this.response.body = val;
    }
    /**
     * @property cookies
     * Get request cookies
     */
    get cookies() {
        if (!this[COOKIES]) {
            this[COOKIES] = new Cookies(this.req, this.res, {
                keys: this.app.keys,
                secure: this.request.secure
            });
        }
        return this[COOKIES];
    }
    /**
     * @property cookies
     * Set request cookies
     */
    set cookies(_cookies) {
        this[COOKIES] = _cookies;
    }
    /**
     * @property etag
     * Get response etag
     */
    get etag() {
        return this.response.etag;
    }
    /**
     * @property etag
     * Set response etag
     */
    set etag(val) {
        this.response.etag = val;
    }
    /**
     * Indicates whether the request is “fresh.” It is the opposite of req.stale.
     *  - It is true if the cache-control request header doesn’t have a no-cache directive and any of the following are true:
     *  - The if-modified-since request header is specified and last-modified request header is equal to or earlier than the modified response header.
     *  - The if-none-match request header is *.
     *  - The if-none-match request header, after being parsed into its directives, does not match the etag response header.
     */
    get fresh() {
        return this.request.fresh;
    }
    /**
     * @property header
     * Get request header
     */
    get header() {
        return this.request.header;
    }
    /**
     * @property headers
     * Get request headers
     */
    get headers() {
        return this.request.headers;
    }
    /**
     * @property headers
     * Set request headers
     */
    set headers(val) {
        this.request.headers = val;
    }
    /**
     * @property headerSent
     * Get request headerSent
     */
    get headerSent() {
        return this.response.headerSent;
    }
    /**
     * @property host
     * Get request host
     */
    get host() {
        return this.request.host;
    }
    /**
     * @property hostname
     * Get request hostname
     */
    get hostname() {
        return this.request.hostname;
    }
    /**
     * @property href
     * Get request href
     */
    get href() {
        return this.request.href;
    }
    /**
     * @property idempotent
     * Get request idempotent
     */
    get idempotent() {
        return this.request.idempotent;
    }
    /**
     * @property ip
     * Get request ip
     */
    get ip() {
        return this.request.ip;
    }
    /**
     * @property ips
     * Get request ips
     */
    get ips() {
        return this.request.ips;
    }
    /**
     * @property lastModified
     * Get response lastModified
     */
    get lastModified() {
        return this.response.lastModified;
    }
    /**
     * @property lastModified
     * Set response lastModified
     */
    set lastModified(date) {
        this.response.lastModified = date;
    }
    /**
     * @property length
     * Get response length
     */
    get length() {
        return this.response.length;
    }
    /**
     * @property length
     * Set response length
     */
    set length(val) {
        this.response.length = val;
    }
    /**
     * @property message
     * Get response message
     */
    get message() {
        return this.response.message;
    }
    /**
     * @property message
     * Set response message
     */
    set message(val) {
        this.response.message = val;
    }
    /**
     * @property method
     * Get request method
     */
    get method() {
        return this.request.method;
    }
    /**
     * @property method
     * Set request method
     */
    set method(val) {
        this.request.method = val;
    }
    /**
     * @property origin
     * Get request origin
     */
    get origin() {
        return this.request.origin;
    }
    /**
     * @property originalUrl
     * Get request originalUrl
     */
    get originalUrl() {
        return this.request.originalUrl;
    }
    /**
     * @property path
     * Get request path
     */
    get path() {
        return this.request.path;
    }
    /**
     * @property path
     * Set request path
     */
    set path(val) {
        this.request.path = val;
    }
    /**
     * @property protocol
     * Get request protocol
     */
    get protocol() {
        return this.request.protocol;
    }
    /**
     * @property query
     * Get request query
     */
    get query() {
        return this.request.query;
    }
    /**
     * @property query
     * Set request query
     */
    set query(val) {
        this.request.query = val;
    }
    /**
     * @property querystring
     * Get request querystring
     */
    get querystring() {
        return this.request.querystring;
    }
    /**
     * @property querystring
     * Set request querystring
     */
    set querystring(val) {
        this.request.querystring = val;
    }
    /**
     * @method redirect
     * Response redirect method
     */
    redirect(url, alt) {
        return this.response.redirect(url, alt);
    }
    /**
     * @property search
     * Get request search
     */
    get search() {
        return this.request.search;
    }
    /**
     * @property search
     * Set request search
     */
    set search(val) {
        this.request.search = val;
    }
    /**
     * @property secure
     * Set request secure
     */
    get secure() {
        return this.request.secure;
    }
    /**
     * @property url
     * Get request url
     */
    get url() {
        return this.request.url;
    }
    /**
     * @property url
     * Set request url
     */
    set url(val) {
        this.request.url = val;
    }
    /**
     * @property stale
     * Get request stale
     */
    get stale() {
        return this.request.stale;
    }
    /**
     * @property socket
     * Get request socket
     */
    get socket() {
        return this.request.socket;
    }
    /**
     * @property subdomains
     * Get request subdomains
     */
    get subdomains() {
        return this.request.subdomains;
    }
    /**
     * @property status
     * Get response status
     */
    get status() {
        return this.response.status;
    }
    /**
     * @property status
     * Set response status
     */
    set status(val) {
        this.response.status = val;
    }
    /**
     * @property type
     * Get response type
     */
    get type() {
        return this.response.type;
    }
    /**
     * @property type
     * Set response type
     */
    set type(type) {
        this.response.type = type;
    }
    /**
     * @method remove
     * Response remove header field
     */
    remove(field) {
        return this.response.remove(field);
    }
    onerror(err) {
        // don't do anything if there is no error.
        // this allows you to pass `this.onerror`
        // to node-style callbacks.
        if (null == err)
            return;
        if (!(err instanceof Error))
            err = new Error(util.format('non-error thrown: %j', err));
        let headerSent = false;
        if (this.headerSent || !this.writable) {
            headerSent = err.headerSent = true;
        }
        // delegate
        this.app.emit('error', err, this);
        // nothing we can do here other
        // than delegate to the app-level
        // handler and log.
        if (headerSent) {
            return;
        }
        const res = this.res;
        // first unset all headers
        /* istanbul ignore else */
        if (typeof res.getHeaderNames === 'function') {
            res.getHeaderNames().forEach((name) => res.removeHeader(name));
        }
        // then set those specified
        this.set(err.headers);
        // force text/plain
        this.type = 'text';
        // ENOENT support
        if ('ENOENT' === err.code)
            err.status = 404;
        // default to 500
        if ('number' !== typeof err.status || !statuses[err.status])
            err.status = 500;
        // respond
        const code = statuses[err.status];
        const msg = err.expose ? err.message : code;
        this.status = err.status;
        this.length = Buffer.byteLength(msg);
        this.res.end(msg);
    }
    throw(...args) {
        throw httpErrors(...args);
    }
    set(...args) {
        return this.response.set(args[0], args[1]);
    }
    /**
     * @method get
     * Get request headers
     */
    get(field) {
        return this.request.get(field);
    }
    /**
     * @method vary
     * Response vary handler
     */
    vary(field) {
        return this.response.vary(field);
    }
    /**
     * @method flushHeaders
     * Response flush headers
     */
    flushHeaders() {
        this.response.flushHeaders();
    }
    accepts(args) {
        return this.request.accepts(args);
    }
    acceptsLanguages(args) {
        return this.request.acceptsLanguages(args);
    }
    acceptsCharsets(args) {
        return this.request.acceptsCharsets(args);
    }
    acceptsEncodings(args) {
        return this.request.acceptsEncodings(args);
    }
}
exports.ServletContext = ServletContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldENvbnRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9TZXJ2bGV0Q29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBR0gsNkJBQTRCO0FBQzVCLG1DQUFrQztBQUNsQyxxQ0FBb0M7QUFDcEMsMENBQXlDO0FBQ3pDLDBDQUF5QztBQU16QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUxQyxNQUFhLGNBQWM7SUFDdkI7Ozs7OztPQU1HO0lBQ0gsWUFDVyxHQUFvQixFQUNwQixHQUFtQixFQUNuQixPQUF1QixFQUN2QixRQUF5QixFQUN6QixHQUFZO1FBSlosUUFBRyxHQUFILEdBQUcsQ0FBaUI7UUFDcEIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIsUUFBRyxHQUFILEdBQUcsQ0FBUztRQU92QixnQkFBZ0I7UUFDVCxZQUFPLEdBQVksSUFBSSxDQUFBO1FBMEM5Qjs7O1dBR0c7UUFDSSxXQUFNLEdBQUcsVUFBVSxDQUFDO0lBckR4QixDQUFDO0lBU0o7OztPQUdHO0lBQ0gsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQTtJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQTtJQUM5QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ks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