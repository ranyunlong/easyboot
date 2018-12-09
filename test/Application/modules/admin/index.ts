import { Module } from '../../../../src';
import { IndexController } from './contorllers/IndexController';
import { UserService } from './services/UserService';
import { Uidservices } from './services/Uidservices';

@Module({
    controllers: [
        IndexController
    ],
    providers: [
        UserService,
        Uidservices
    ]
})
export class AdminModule {}