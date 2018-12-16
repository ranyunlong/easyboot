import { Module } from '../../../../src';
import { IndexController } from './controllers/IndexController';
import { AdminModule } from '../AdminModule';

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