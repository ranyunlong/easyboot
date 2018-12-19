/**
 * @class HttpException
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export class HttpException extends Error {
    public statusCode: number;
    public data: any;
    constructor(options: Options) {
        super(options.message)
        this.statusCode = options.statusCode || 500
        this.data = options.data
    }
}

HttpException.prototype.name = 'HttpException';
interface Options {
    statusCode?: number;
    message?: string;
    data?: any;
}

export interface HttpExceptionConstructor {
    new (error: HttpException): HttpException;
}