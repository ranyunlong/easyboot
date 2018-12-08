import { EasyBootServletConfiguration } from '../../../src'

export class ApplicationConfig extends EasyBootServletConfiguration {
    public port: number = 3000
    public host: string = 'localhost'
}