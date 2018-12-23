import { ServletConfiguration } from '../../../src'
import { SessionConfig } from './SessionConfig';

export class ApplicationConfig extends ServletConfiguration {
    public port: number = 3000
    public host: string = 'localhost'
    public session = new SessionConfig()
}