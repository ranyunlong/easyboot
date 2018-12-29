import { Module } from '../../../../src';
import { UserController } from './contorllers/UserController';
import { UserService } from './services/UserService';

@Module({
    controllers: [
        UserController,
    ],
    providers: [
        UserService
    ],
    exports: [
        UserService
    ]
})
export class Admin {}