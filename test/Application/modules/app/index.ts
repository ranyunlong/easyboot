import { Module } from '../../../../src';
import { IndexController } from './controllers/IndexController';
import { UserService } from '../admin/services/UserService';
import { AdminModule } from '../admin';

@Module({
    imports: [
        AdminModule
    ],
    providers: [],
    controllers: [
        IndexController
    ]
})
export class AppModule {}