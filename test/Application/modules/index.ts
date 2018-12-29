import { Module } from '../../../src';
import { Admin } from './Admin';
import { App } from './App';
import { Test } from './Test';

@Module({
    imports: [
        App,
        Admin,
        Test
    ]
})
export class RootModule {}