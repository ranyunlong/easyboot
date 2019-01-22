/**
 * @class SessionEntity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
interface SessionConstructor {
    new <T extends object>(arg: T): T;
}
export declare const Session: SessionConstructor;
export declare type Session<T> = T;
export {};
