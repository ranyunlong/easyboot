import { ServletConfiguration, StaticConfiguration, ProxyTable } from '../../../src'
import { SessionConfig } from './SessionConfig';
import { resolve } from 'path'

export class ApplicationConfig extends ServletConfiguration {
    public port: number = 3000
    public host: string = 'localhost'
    public session = new SessionConfig()
    public staticConfig = new StaticConfiguration(resolve('test', 'public'))
    // public proxyTable: ProxyTable = {
    //     'api-baidu': {
    //         target: 'https://www.baidu.com',
    //         pathRewrite: {
    //             '^/api-baidu': '/'
    //         }
    //     },
    //     'api-qq': {
    //         target: 'https://www.qq.com',
    //         pathRewrite: {
    //             '^/api-qq': '/'
    //         }
    //     }
    // }
}