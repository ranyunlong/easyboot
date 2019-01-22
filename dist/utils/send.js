"use strict";
/**
 * util send
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const resolve_path_1 = require("./resolve-path");
const assert = require("assert");
const httpError = require("http-errors");
const mz_1 = require("mz");
const path_1 = require("path");
async function default_1(ctx, path, opts) {
    assert(ctx, 'context required');
    assert(path, 'pathname required');
    const root = opts.root ? path_1.normalize(path_1.resolve(opts.root)) : '';
    const trailingSlash = path[path.length - 1] === '/';
    path = path.substr(path_1.parse(path).root.length);
    const index = opts.index;
    const maxage = opts.maxage || opts.maxAge || 0;
    const immutable = opts.immutable || false;
    const hidden = opts.hidden || false;
    const format = opts.format !== false;
    const extensions = Array.isArray(opts.extensions) ? opts.extensions : false;
    const brotli = opts.brotli !== false;
    const gzip = opts.gzip !== false;
    const setHeaders = opts.setHeaders;
    if (setHeaders && typeof setHeaders !== 'function') {
        throw new TypeError('option setHeaders must be function');
    }
    // normalize path
    const _path = decode(path);
    if (!~_path) {
        return ctx.throw(400, 'failed to decode');
    }
    else {
        path = _path;
    }
    // index file support
    if (index && trailingSlash)
        path += index;
    path = resolve_path_1.default(root, path);
    // hidden file support, ignore
    if (!hidden && isHidden(root, path))
        return;
    let encodingExt = '';
    // serve brotli file when possible otherwise gzipped file when possible
    if (ctx.acceptsEncodings('br', 'identity') === 'br' && brotli && (await mz_1.fs.exists(path + '.br'))) {
        path = path + '.br';
        ctx.set('Content-Encoding', 'br');
        ctx.res.removeHeader('Content-Length');
        encodingExt = '.br';
    }
    else if (ctx.acceptsEncodings('gzip', 'identity') === 'gzip' && gzip && (await mz_1.fs.exists(path + '.gz'))) {
        path = path + '.gz';
        ctx.set('Content-Encoding', 'gzip');
        ctx.res.removeHeader('Content-Length');
        encodingExt = '.gz';
    }
    if (extensions && !/\.[^/]*$/.exec(path)) {
        const list = [].concat(extensions);
        for (let item of list) {
            if (typeof item !== 'string') {
                throw new TypeError('option extensions must be array of strings or false');
            }
            if (!/^\./.exec(item))
                item = '.' + item;
            if (await mz_1.fs.exists(path + item)) {
                path = path + item;
                break;
            }
        }
    }
    let stats;
    try {
        stats = await mz_1.fs.stat(path);
        // Format the path to serve static file servers
        // and not require a trailing slash for directories,
        // so that you can do both `/directory` and `/directory/`
        if (stats.isDirectory()) {
            if (format && index) {
                path += '/' + index;
                stats = await mz_1.fs.stat(path);
            }
            else {
                return;
            }
        }
    }
    catch (err) {
        const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
        if (notfound.includes(err.code)) {
            throw httpError(404, err);
        }
        err.status = 500;
        throw err;
    }
    if (setHeaders)
        setHeaders(ctx.res, path, stats);
    // stream
    // media
    const range = ctx.request.get('range');
    if (range) {
        let parts = range.replace(/bytes=/, '').split('-');
        let [rangeStart, rangeEnd] = parts;
        let start = Number(rangeStart);
        let end = stats.size - 1;
        let chunksize = stats.size - start;
        ctx.set('Content-Range', `bytes ${start}-${end}/${stats.size}`);
        ctx.set('Accept-Ranges', 'bytes');
        ctx.status = 206;
        ctx.body = mz_1.fs.createReadStream(path, {
            start,
            end
        });
        ctx.length = chunksize;
        if (!ctx.type)
            ctx.type = type(path, encodingExt);
    }
    else {
        ctx.set('Content-Length', stats.size.toString());
        if (!ctx.response.get('Last-Modified'))
            ctx.set('Last-Modified', stats.mtime.toUTCString());
        if (!ctx.response.get('Cache-Control')) {
            const directives = ['max-age=' + (maxage / 1000 | 0)];
            if (immutable) {
                directives.push('immutable');
            }
            ctx.set('Cache-Control', directives.join(','));
        }
        if (!ctx.type)
            ctx.type = type(path, encodingExt);
        ctx.body = mz_1.fs.createReadStream(path);
    }
    return path;
}
exports.default = default_1;
/**
 * File type.
 */
function type(file, ext) {
    return ext !== '' ? path_1.extname(path_1.basename(file, ext)) : path_1.extname(file);
}
exports.type = type;
/**
 * Decode `path`.
 */
function decode(path) {
    try {
        return decodeURIComponent(path);
    }
    catch (err) {
        return -1;
    }
}
exports.decode = decode;
/**
 *  Check if it's hidden.
 */
function isHidden(root, path) {
    path = path.substr(root.length).split(path_1.sep);
    for (let i = 0; i < path.length; i++) {
        if (path[i][0] === '.')
            return true;
    }
    return false;
}
exports.isHidden = isHidden;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOztBQUVIOztHQUVHO0FBQ0gsaURBQXdDO0FBQ3hDLGlDQUFnQztBQUNoQyx5Q0FBd0M7QUFDeEMsMkJBQXVCO0FBQ3ZCLCtCQUF3RTtBQUt6RCxLQUFLLG9CQUFVLEdBQW1CLEVBQUUsSUFBWSxFQUFFLElBQW1CO0lBQ2hGLE1BQU0sQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtJQUMvQixNQUFNLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUE7SUFFakMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUMzRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUE7SUFDbkQsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUE7SUFDOUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUE7SUFDekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUE7SUFDbkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUE7SUFDcEMsTUFBTSxVQUFVLEdBQUcsS0FB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