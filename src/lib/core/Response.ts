/**
 * @class Response
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { IncomingMessage, ServerResponse } from 'http'
import { ensureErrorHandler } from './utils';
import { Socket } from 'net'
import { Stream } from 'stream'
import * as path from 'path'
import * as mime from 'mime-types'
import * as vary from 'vary'
import * as typeIs from 'type-is'
import * as disposition from 'content-disposition'
import * as statuses from 'statuses'
import * as onFinish from 'on-finished'
import * as escape from 'escape-html'
import destroy = require('destroy')
import EasyBootServlet from './EasyBootServlet';
import { getType } from './utils';
import { Context } from './Context';
import { Request } from './Request';
import { Entity } from '../decorators';

@Entity
export class Response {
    private _body: any;
    public ctx: Context;
    public request: Request;
    public _explicitStatus: boolean;
    constructor(
        public req: IncomingMessage,
        public res: ServerResponse,
        public app: EasyBootServlet
    ) {
        const { version } = require('../../../package.json')
        this.set('Server',  `easyboot:${version}`)
        this.vary('Accept-Encoding')
    }

    /**
     * @property socket
     * Return the request socket.
     */
    public get socket(): Socket {
        return (this.res as any).socket
    }

    /**
     * @property header
     * Return response header, alias as response.header
     */
    public get header() {
        return this.res.getHeaders()
    }

    /**
     * @property headers
     * Return response header, alias as response.header
     */
    public get headers() {
        return this.res.getHeaders()
    }

    /**
     * @property lastModified
     * Get the Last-Modified date in Date form, if it exists.
     */
    public get lastModified() {
        const s: string = this.get('Last-Modified') as string
        return new Date(s)
    }

    /**
     * @property lastModified
     * Set the Last-Modified date using a string or a Date.
     */
    public set lastModified(val: Date) {
        this.set('Last-Modified', val.toUTCString())
    }

    /**
     * @property length
     * Return parsed response Content-Length when present.
     */
    public get length() {
        let length = this.get('Content-Length')
        if (!length) {
            if (!this.body) return null;
            if (typeof this.body === 'string') {
                return Buffer.byteLength(this.body)
            }
            if (Buffer.isBuffer(this.body)) {
                return this.body.byteLength
            }
            if (this.body instanceof Object) {
                return Buffer.byteLength(JSON.stringify(this.body))
            }
        }

        // ~~ format length to number
        return ~~length
    }

    /**
     * @property length
     * Set Content-Length field to `val`
     */
    public set length(val: number) {
        this.set('Content-Length', val.toString())
    }

    /**
     * @property writable
     * Checks if the request is writable.
     * Tests for the existence of the socket
     * as node sometimes does not set it.
     */
    public get writable() {
        if (this.finished) return false;
        const socket = this.socket;
        if (!socket) return true
        const res = this.res as ServerResponse
        return res.writable
    }

    /**
     * @property headerSent
     * Check if a header has been written to the socket.
     */
    public get headerSent() {
        return this.res.headersSent
    }

    /**
     * @property finished
     * Return response finished
     */
    public get finished() {
        return this.res.finished;
    }

    /**
     * @property status
     * Get response status code.
     */
    public get status() {
        return this.res.statusCode
    }

    /**
     * @property status
     * Set response status code.
     */
    public set status(val: number) {
        this._explicitStatus = true
        this.res.statusCode = val
        if ((this.req as IncomingMessage).httpVersionMajor < 2) this.res.statusMessage = statuses[val];
        if (this.body && statuses.empty[val]) this.body = null;
    }

    /**
     * @property type
     * Set Content-Type response header with `type` through `mime.contentType()`
     */
    public set type(val: string) {
        val = getType(val)
        if (val) {
            this.set('Content-Type', val);
        } else {
            this.remove('Content-Type');
        }
    }

    /**
     * @property message
     * Get response status message
     */
    public get message() {
        return this.res.statusMessage || statuses[this.status];
    }

    /**
     * @property message
     * Set response status message
     */
    public set message(val: any) {
        this.res.statusMessage = val
    }

    /**
     * @property body
     * Get response body.
     */
    public get body(): String | Buffer | Object | Stream {
        return this._body
    }

    /**
     * @property body
     * Set response body.
     */
    public set body(val: String | Buffer | Object | Stream) {
        if (this.finished) return;

        const original = this._body;
        this._body = val;

        // no content
        if (null == val) {
            if (!statuses.empty[this.status]) this.status = 204;
            this.remove('Content-Type');
            this.remove('Content-Length');
            this.remove('Transfer-Encoding');
            return;
        }

        // set the status
        if (!this._explicitStatus) this.status = 200;

        // set the content-type only if not yet set
        const setType = !this.header['content-type'];

        // string
        if ('string' === typeof val) {
            if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
            this.length = Buffer.byteLength(val);
            return;
        }

        // buffer
        if (Buffer.isBuffer(val)) {
            if (setType) this.type = 'bin';
            this.length = val.length;
            return;
        }

        // stream
        if (val instanceof Stream) {
            onFinish(this.res as ServerResponse, destroy.bind(null, val));
            ensureErrorHandler(val, (err: any) => this.ctx.onerror(err))

            // overwriting
            if (null != original && original !== val) this.remove('Content-Length');

            if (setType) this.type = 'bin';
            return;
        }

        // json
        this.remove('Content-Length');
        this.type = 'json';
    }

    /**
     * Get the ETag of a response.
     */
    public get etag() {
        return this.get('ETag') as string;
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
    public set etag(val: string) {
        if (!/^(W\/)?"/.test(val)) val = `"${val}"`;
        this.set('ETag', val)
    }

    /**
     * @method
     */
    public onError(err: Error) {
        console.log(err)
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
    public get(field: string): string | number | string[] {
        return this.res.getHeader(field)
    }

    /**
     * @method attachment
     * Set Content-Disposition header to "attachment" with optional `filename`.
     */
    public attachment(filename: string) {
        this.set('Content-Disposition', disposition(filename))
        const mimeType = mime.contentType(path.extname(filename))
        if (mimeType) {
                this.set('Content-Type', mimeType)
        }
    }

    /**
     * @method set
     * Set header `field` to `val`, or pass
     * an object of header fields.
     *
     * Examples:
     *
     *    this.set('Foo', ['bar', 'baz']);
     *    this.set('Accept', 'application/json');
     *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
     */
    public set(field: { [key: string]: string }): void;
    public set(field: string, val: string | string[]): void;
    public set(...args: any[]): any {
        const [field, val] = args;
        if (field instanceof Object) {
            Object.keys(field).forEach((k: string) => {
                this.res.setHeader(k, field[k])
            })
        } else {
            this.res.setHeader(field, val)
        }
    }

    /**
     * @method append
     * Append additional header `field` with value `val`.
     */
    public append(field: string, val: string | string[]): void {
        if (!this.res.hasHeader(field)) {
            this.set(field, val)
        }
    }

    /**
     * @method remove
     * Remove header `field`.
     */
    public remove(field: string): void {
        if (this.headerSent) return;
        this.res.removeHeader(field)
    }

    /**
     * @method vary
     * Vary on `field`.
     */
    public vary(field: string) {
        if (this.headerSent) return;
        return vary(this.res as ServerResponse, field)
    }

    /**
     * @method is
     * Check whether the response is one of the listed types.
     * Pretty much the same as `this.request.is()`.
     */
    public is(type: string): string | false;
    public is(...types: string[]): string | false {
        return typeIs.is(this.type, types)
    }

    /**
     * @method flushHeaders
     * Flush any set headers, and begin the body
     */
    public flushHeaders() {
        const res = this.res as ServerResponse
        res.flushHeaders()
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
    public redirect(url: string, alt?: string): void {
        // location
        if ('back' === url) url = (this.ctx.get('Referrer') as string) || alt || '/';
        this.set('Location', url);
        // status
        if (!statuses.redirect[this.status]) this.status = 302;
        // html
        if (this.ctx.accepts('html')) {
          url = escape(url);
          this.type = mime.contentType('html') as string;
          this.body = `Redirecting to <a href="${url}">${url}</a>.`;
          return;
        }
        // text
        this.type = 'text/plain; charset=utf-8';
        this.body = `Redirecting to ${url}.`;
    }
}