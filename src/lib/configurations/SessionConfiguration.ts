import { SessionStore } from '../core';

export class SessionConfiguration {
    public key?: string;
    public signed: boolean = true;
    public maxAge?: number = 1000000;
    public store?: SessionStore = new SessionStore()
}