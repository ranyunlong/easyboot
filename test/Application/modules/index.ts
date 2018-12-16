import { Module } from '../../../src';
import { AppModule } from './AppModule';
import { AdminModule } from './AdminModule';

@Module({
    imports: [
        AppModule,
        AdminModule
    ]
})
export class RootModule {}