import { Servlet, Configuration, ServletConfiguration } from '../../src'
import { AppModule } from './modules/app';

@Configuration(ServletConfiguration)
export class Application extends Servlet {
    public bootstrap() {
        this.router.parseModule(AppModule)
    }
}

new Application()