import { Module } from '../../../src';
import { AppModule } from './AppModule';
import { AdminModule } from './AdminModule';
import { TestModule } from './TestModule';

@Module({
    imports: [
        AppModule,
        AdminModule,
        TestModule
    ]
})
export class RootModule {}