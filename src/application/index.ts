import { Servlet, Configuration } from '@easyboot/core'
import { AppConfig } from './configs/AppConfig';
import { AppModule } from './modules/app';

@Configuration(AppConfig)
export class Application extends Servlet {
    public bootstrap() {
        this.registerModule(AppModule)
    }
}