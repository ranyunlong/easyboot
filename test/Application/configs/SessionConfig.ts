import { SessionConfiguration, SessionStore } from '../../../src'
export class SessionConfig extends SessionConfiguration {
    public store = new SessionStore()
}