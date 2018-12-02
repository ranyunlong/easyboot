import { EasyBootServlet, Context, Modules, Configuration } from '../../src'
import { AdminModule } from './modules/admin';
import { HomeModule } from './modules/home';
import { ServletConfig } from './config/ServletConfig';

@Configuration(ServletConfig)
@Modules([ AdminModule, HomeModule ])
export class MyApplication extends EasyBootServlet {
    public async response(context: Context) {
        return;
    }
}