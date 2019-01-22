"use strict";
/**
 * @class HttpException
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(options) {
        super(options.message);
        this.statusCode = options.statusCode || 500;
        this.data = options.data;
    }
}
exports.HttpException = HttpException;
HttpException.prototype.name = 'HttpException';
//# sourceMappingURL=HttpException.js.map