import { Servlet, Configuration } from '@easyboot/core'
import { RootModule } from './RootModule';
import { AppConfig } from './configs/AppConfig';

@Configuration(AppConfig)
export class Application extends Servlet {
    public bootstrap() {
        this.registerModule(RootModule)
    }
}