import { Module } from '../../../../src'
import { IndexController } from './controllers/IndexController';
import { UserService } from './services/UserService';
import { TestService } from './services/TestService';

@Module({
    controllers: [ IndexController ],
    providers: [ UserService, TestService ]
})
export class AdminModule {}