import { ServletConfiguration } from '@easyboot/core';
import { resolve } from 'path'

export class AppConfig extends ServletConfiguration {
    public port: number = 5000
    public staticDir: string = resolve('public')
}