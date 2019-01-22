/**
 * @class HttpException
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export declare class HttpException extends Error {
    statusCode: number;
    data: any;
    constructor(options: Options);
}
interface Options {
    statusCode?: number;
    message?: string;
    data?: any;
}
export interface HttpExceptionConstructor {
    new (error: HttpException): HttpException;
}
export {};
