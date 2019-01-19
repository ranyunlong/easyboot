import { Module } from '../../../../src';
import { UserController } from './controllers/UserController';
import { TestController } from './controllers/TestController';
import { UserService } from './services/UserService';

@Module({
    controllers: [
        UserController,
        TestController
    ],
    providers: [
        UserService
    ]
})
export class AppModule {}