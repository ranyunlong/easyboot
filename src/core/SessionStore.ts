/**
 * @class SessionEntity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { randomBytes } from 'crypto'

export class SessionStore {
    public sessions: Map<string, any>;
    public __timer: Map<any, any>;
    constructor() {
        this.sessions = new Map();
        this.__timer = new Map();
    }

    public createSid(length: number): string {
        const sid = randomBytes(length).toString('hex');
        if (!this.sessions.has(sid)) return sid;
        return this.createSid(length)
    }

    public async get(sid: string): Promise<any> {
        if (!this.sessions.has(sid)) return undefined;
        return JSON.parse(this.sessions.get(sid))
    }

    public async set(session: object, { sid =  this.createSid(24), maxAge = 1000000 }: SetStoreOption): Promise<string> {
        if (this.sessions.has(sid) && this.__timer.has(sid)) {
            const timeout = this.__timer.get(sid);
            if (timeout) clearTimeout(timeout);
        }

        if (maxAge) {
            this.__timer.set(sid, setTimeout(() => this.destroy(sid), maxAge));
        }

        try {
            this.sessions.set(sid, JSON.stringify(session));
            return sid;
        } catch (err) {
            console.log('Set session error:', err);
        }
    }

    public async destroy(sid: any) {
        this.sessions.delete(sid);
        this.__timer.delete(sid);
    }

}

interface SetStoreOption {
    sid: string;
    maxAge: number;
}