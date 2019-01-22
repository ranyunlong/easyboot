/**
 * @class SessionEntity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export declare class SessionStore {
    sessions: Map<string, any>;
    __timer: Map<any, any>;
    constructor();
    createSid(length: number): string;
    get(sid: string): Promise<any>;
    set(session: object, { sid, maxAge }: SetStoreOption): Promise<string>;
    destroy(sid: any): Promise<void>;
}
interface SetStoreOption {
    sid: string;
    maxAge: number;
}
export {};
