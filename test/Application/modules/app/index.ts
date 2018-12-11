import { Module } from '../../../../src';
import { IndexController } from './controllers/IndexController';
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