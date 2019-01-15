import { HttpServlet, Configuration } from '../../src'
import { ApplicationConfig } from './configs/ApplicationConfig';

@Configuration(ApplicationConfig)
export class Application extends HttpServlet {}

new Application()