import { Module } from '../../../../src'
import { IndexController } from './controllers/IndexController';
import { UserService } from './services/UserServices';

@Module({
    controllers: [ IndexController ],
    providers: [ UserService ]
})
export class HomeModule {}