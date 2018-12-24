"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class SessionStore {
    constructor() {
        this.sessions = new Map();
        this.__timer = new Map();
    }
    createSid(length) {
        const sid = crypto_1.randomBytes(length).toString('hex');
        if (!this.sessions.has(sid))
            return sid;
        return this.createSid(length);
    }
    async get(sid) {
        if (!this.sessions.has(sid))
            return undefined;
        return JSON.parse(this.sessions.get(sid));
    }
    async set(session, { sid = this.createSid(24), maxAge = 1000000 }) {
        if (this.sessions.has(sid) && this.__timer.has(sid)) {
            const timeout = this.__timer.get(sid);
            if (timeout)
                clearTimeout(timeout);
        }
        if (maxAge) {
            this.__timer.set(sid, setTimeout(() => this.destroy(sid), maxAge));
        }
        try {
            this.sessions.set(sid, JSON.stringify(session));
            return sid;
        }
        catch (err) {
            console.log('Set session error:', err);
        }
    }
    async destroy(sid) {
        this.sessions.delete(sid);
        this.__timer.delete(sid);
    }
}
exports.SessionStore = SessionStore;
