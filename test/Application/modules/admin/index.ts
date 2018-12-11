import { Module } from '../../../../src';
import { IndexController } from './contorllers/IndexController';
import { UserService } from './services/UserService';
import { TestController } from './contorllers/TestController';

@Module({
    controllers: [
        IndexController,
        TestController
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})
export class AdminModule {}