import { Module } from '../../../../src'
import { IndexController } from './controllers/IndexController';
import { UserService } from './services/UserService';

@Module({
    controllers: [ IndexController ],
    providers: [ UserService ]
})
export class AdminModule {}