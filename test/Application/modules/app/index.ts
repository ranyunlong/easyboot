import { Module } from '../../../../src';
import { IndexController } from './controllers/IndexController';

@Module({
    providers: [],
    controllers: [
        IndexController
    ]
})
export class AppModule {}