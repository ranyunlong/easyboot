import { Module } from '../../../src';
import { AdminModule } from './admin';
import { SessionService } from '../services/SessionService';
import { AppModule } from './app';

@Module({
    imports: [
        AppModule,
        AdminModule
    ],
    providers: [
        SessionService
    ]
})
export class RootModule {}