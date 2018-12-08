import { Module } from '../../../src';
import { AdminModule } from './admin';
import { SessionService } from '../services/SessionService';

@Module({
    modules: [
        AdminModule
    ],
    providers: [
        SessionService
    ],
    exports: [
        SessionService
    ]
})
export class RootModule {}