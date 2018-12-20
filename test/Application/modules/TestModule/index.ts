import { Module } from '../../../../src';
import { IndexController } from './controllers/IndexController';

@Module({
    controllers: [
        IndexController
    ]
})
export class TestModule {

}