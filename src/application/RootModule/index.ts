import { Module } from '@easyboot/core';
import { IndexController } from './controllers/IndexController';

@Module({
    controllers: [
        IndexController
    ]
})
export class RootModule {}