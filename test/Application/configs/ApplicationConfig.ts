import { ServletConfiguration } from '../../../src'

export class ApplicationConfig extends ServletConfiguration {
    public port: number = 3000;
    public host: string = 'localhost';
}