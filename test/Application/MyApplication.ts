import { EasyBootServlet, Context, Configuration, EasyBootApplication } from '../../src'
import { ApplicationConfig } from './configs/ApplicationConfig';
import { RootModule } from './modules';

@Configuration(ApplicationConfig)
@EasyBootApplication(RootModule)
export class MyApplication extends EasyBootServlet {
    public async response(context: Context) {
        return;
    }
}