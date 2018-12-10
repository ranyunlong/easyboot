import { Module } from '../../../src';
import { AdminModule } from './admin';
import { SessionService } from '../services/SessionService';
import { AppModule } from './app';

@Module({
    modules: [
        AdminModule,
        AppModule
    ],
    providers: [
        SessionService
    ],
    exports: [
        SessionService
    ]
})
export class RootModule {}