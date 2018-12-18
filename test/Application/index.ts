import { EasyBootServlet, Context, Configuration, EasyBootApplication } from '../../src'
import { ApplicationConfig } from './configs/ApplicationConfig';
import { RootModule } from './modules';

@Configuration(ApplicationConfig)
@EasyBootApplication(RootModule)
export class Application extends EasyBootServlet {
    public async run(context: Context) {
        return;
    }
}

new Application()