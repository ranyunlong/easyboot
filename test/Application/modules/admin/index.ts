import { Module } from '../../../../src';
import { IndexController } from './contorllers/IndexController';
import { UserService } from './services/UserService';

@Module({
    controllers: [
        IndexController
    ],
    providers: [
        UserService
    ]
})
export class AdminModule {}