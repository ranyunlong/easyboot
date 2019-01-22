"use strict";
/**
 * @class ServletRequest
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const accepts = require("accepts");
const qs = require("querystring");
const fresh = require("fresh");
const mime = require("mime-types");
const typeIs = require("type-is");
const parseUrl = require("parseurl");
const net = require("net");
const url_1 = require("url");
class ServletRequest {
    constructor(req, res, app) {
        this.req = req;
        this.res = res;
        this.app = app;
        // originalUrl
        this.originalUrl = req.url || '';
    }
    /**
     * @property subdomains
     * Return subdomains as an array.
     *
     * Subdomains are the dot-separated parts of the host before the main domain
     * of the app. By default, the domain of the app is assumed to be the last two
     * parts of the host. This can be changed by setting `app.subdomainOffset`.
     *
     * For example, if the domain is "tobi.ferrets.example.com":
     * If `app.subdomainOffset` is not set, this.subdomains is
     * `["ferrets", "tobi"]`.
     * If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
     */
    get subdomains() {
        const offset = this.app.subdomainOffset;
        const hostname = this.hostname;
        if (net.isIP(hostname))
            return [];
        return hostname
            .split('.')
            .reverse()
            .slice(offset);
    }
    /**
     * @property charset
     * Get the charset when present or undefined.
     */
    get charset() {
        const contentType = this.get('content-type');
        return mime.charset(contentType);
    }
    /**
     * @property type
     * Get the type when present or undefined.
     */
    get type() {
        const contentType = this.get('content-type');
        return mime.contentType(contentType);
    }
    /**
     * @property URL
     * Get WHATWG parsed URL.
     */
    get URL() {
        if (!this._URLcache) {
            this._URLcache = new url_1.URL(this.protocol + '://' + this.host + this.originalUrl);
        }
        return this._URLcache;
    }
    /**
     * @property query
     * Get parsed query-string.
     */
    get query() {
        if (!this._querycache)
            this._querycache = JSON.parse(JSON.stringify(qs.parse(this.querystring))) || {};
        return this._querycache;
    }
    /**
     * @property query
     * Set query-string as an object.
     */
    set query(obj) {
        this.querystring = qs.stringify(obj);
        this._querycache = JSON.parse(JSON.stringify(obj));
    }
    /**
     * @property querystring
     * Get querystring.
     */
    get querystring() {
        if (!this.req)
            return '';
        return parseUrl(this.req).query || '';
    }
    /**
     * @property querystring
     * Set querystring.
     */
    set querystring(val) {
        const url = parseUrl(this.req);
        if (url.search === `?${val}`)
            return;
        url.search = val;
        url.path = null;
        this.url = url_1.format(url);
    }
    /**
     * @property search
     * Get the search string. Same as the querystring
     * except it includes the leading ?.
     */
    get search() {
        if (!this.querystring)
            return '';
        return `?${this.querystring}`;
    }
    /**
     * @property search
     * Set the search string. Same as
     * request.querystring= but included for ubiquity.
     */
    set search(val) {
        this.querystring = val;
    }
    /**
     * @property path
     * Get request pathname.
     */
    get path() {
        return parseUrl(this.req).pathname;
    }
    /**
     * @property path
     * Set pathname, retaining the query-string when present.
     */
    set path(val) {
        const url = parseUrl(this.req);
        if (url.pathname === val)
            return;
        url.pathname = val;
        url.path = null;
        this.url = url_1.format(url);
    }
    /**
     * @property header
     * Get request headers
     */
    get header() {
        return this.req.headers;
    }
    /**
     * @property header
     * Set request headers
     */
    set header(val) {
        this.req.headers = val;
    }
    /**
     * @property header
     * Get request headers
     */
    get headers() {
        return this.req.headers;
    }
    /**
     * @property header
     * Set request headers
     */
    set headers(val) {
        this.req.headers = val;
    }
    /**
     * @property url
     * Get request url
     */
    get url() {
        return this.req.url;
    }
    /**
     * @property url
     * Set request url
     */
    set url(val) {
        this.req.url = val;
    }
    /**
     * @property origin
     * Set request origin
     */
    get origin() {
        return this.protocol + '://' + this.host;
    }
    /**
     * @property href
     * Get full request URL.
     */
    get href() {
        // support: `GET http://example.com/foo`
        if (/^https?:\/\//i.test(this.originalUrl))
            return this.originalUrl;
        return this.origin + this.originalUrl;
    }
    /**
     * @property host
     * Parse the "Host" header field host
     * and support X-Forwarded-Host when a
     * proxy is enabled.
     */
    get host() {
        let host = this.app.proxy && this.get('X-Forwarded-Host');
        host = host || this.get('Host');
        if (!host)
            return '';
        return host.split(/\s*,\s*/)[0];
    }
    /**
     * @property hostname
     * Parse the "Host" header field hostname
     * and support X-Forwarded-Host when a
     * proxy is enabled.
     */
    get hostname() {
        const host = this.host;
        if (!host)
            return '';
        if ('[' === host[0])
            return this.URL.hostname || ''; // IPv6
        return host.split(':')[0];
    }
    /**
     * @property socket
     * Get request socket
     */
    get socket() {
        return this.req.socket;
    }
    /**
     * @property protocol
     * Get protocol
     */
    get protocol() {
        if (this.socket.encrypted)
            return 'https';
        if (!this.app.proxy)
            return 'http';
        const proto = this.get('X-Forwarded-Proto');
        return proto ? proto.split(/\s*,\s*/)[0] : 'http';
    }
    /**
     * @property secure
     * Get secure
     */
    get secure() {
        return 'https' === this.protocol;
    }
    /**
     * @property method
     * Get request method
     */
    get method() {
        return this.req.method;
    }
    /**
     * @property method
     * Set request method
     */
    set method(val) {
        this.req.method = val;
    }
    /**
     * @property ips
     * Get request ips
     */
    get ips() {
        const proxy = this.app.proxy;
        const val = this.get('X-Forwarded-For');
        return proxy && val
            ? val.split(/\s*,\s*/)
            : [];
    }
    /**
     * @property ip
     * Get request ip
     */
    get ip() {
        if (!this._ip) {
            this._ip = this.ips[0] || this.socket.remoteAddress || '';
        }
        return this._ip;
    }
    /**
     * @property ip
     * Set request ip
     */
    set ip(ip) {
        this._ip = ip;
    }
    /**
     * @property accept
     * Get accept object.
     */
    get accept() {
        return this._accept || (this._accept = accepts(this.req));
    }
    /**
     * @property accept
     * Set accept object.
     */
    set accept(obj) {
        this._accept = obj;
    }
    /**
     * Check if the request is fresh, aka
     * Last-Modified and/or the ETag
     * still match.
     *
     * @access public
     */
    get fresh() {
        const method = this.method;
        const status = this.ctx.status;
        // GET or HEAD for weak freshness validation only
        if ('GET' !== method && 'HEAD' !== method)
            return false;
        // 2xx or 304 as per rfc2616 14.26
        if ((status >= 200 && status < 300) || 304 === status) {
            return fresh(this.header, this.response.header);
        }
        return false;
    }
    /**
     * @property idempotent
     * Check if the request is idempotent.
     */
    get idempotent() {
        const methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];
        // ~-1 = 0 , !~-1 = true , !!~ -1 = false
        return !!~methods.indexOf(this.method);
    }
    /**
     * @property length
     * get request Content-Length
     */
    get length() {
        const byteLength = this.get('Content-Length');
        if (byteLength === '')
            return 0;
        // ~~ string to number
        return ~~byteLength;
    }
    /**
     * Check if the request is stale, aka
     * "Last-Modified" and / or the "ETag" for the
     * resource has changed.
     *
     * @access public
     */
    get stale() {
        return !this.fresh;
    }
    /**
     * Check if the incoming request contains the "Content-Type"
     * header field, and it contains any of the give mime `type`s.
     * If there is no request body, `null` is returned.
     * If there is no content type, `false` is returned.
     * Otherwise, it returns the first `type` that matches.
     *
     * Examples:
     *
     *     // With Content-Type: text/html; charset=utf-8
     *     this.is('html'); // => 'html'
     *     this.is('text/html'); // => 'text/html'
     *     this.is('text/*', 'application/json'); // => 'text/html'
     *
     *     // When Content-Type is application/json
     *     this.is('json', 'urlencoded'); // => 'json'
     *     this.is('application/json'); // => 'application/json'
     *     this.is('html', 'application/*'); // => 'application/json'
     *
     *     this.is('html'); // => false
     *
     * @access public
     */
    is(...types) {
        return typeIs(this.req, types);
    }
    /**
     * @method get
     * Get Request header for field
     */
    get(field) {
        return this.req.headers[field];
    }
    accepts(...args) {
        return this.accept.types(...args);
    }
    acceptsLanguages(...args) {
        return this.accept.languages(...args);
    }
    acceptsCharsets(...args) {
        return this.accept.charsets(...args);
    }
    acceptsEncodings(...args) {
        return this.accept.encodings(...args);
    }
}
exports.ServletRequest = ServletRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldFJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9TZXJ2bGV0UmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsbUNBQWtDO0FBQ2xDLGtDQUFpQztBQUNqQywrQkFBOEI7QUFDOUIsbUNBQWtDO0FBQ2xDLGtDQUFpQztBQUNqQyxxQ0FBb0M7QUFDcEMsMkJBQTBCO0FBRTFCLDZCQUFpQztBQVFqQyxNQUFhLGNBQWM7SUFRdkIsWUFDVyxHQUFvQixFQUNwQixHQUFtQixFQUNuQixHQUFZO1FBRlosUUFBRyxHQUFILEdBQUcsQ0FBaUI7UUFDcEIsUUFBRyxHQUFILEdBQUcsQ0FBZ0I7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBUztRQUVuQixjQUFjO1FBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQTtJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsSUFBVyxVQUFVO1FBQ2pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ2xDLE9BQU8sUUFBUTthQUNaLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixPQUFPLEVBQUU7YUFDVCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQVcsT0FBTztRQUNkLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFXLENBQUE7UUFDdEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBVyxDQUFBO0lBQzlDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJ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