import { EasyBootServlet, Context, Modules } from '../../src'
import { AdminModule } from './modules/admin';
import { HomeModule } from './modules/home';

@Modules([ AdminModule, HomeModule ])
export class MyApplication extends EasyBootServlet {
    public async response(context: Context) {
        return;
    }
}