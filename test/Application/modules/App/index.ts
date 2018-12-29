import { Module } from '../../../../src';
import { IndexController } from './controllers/IndexController';
import { Admin } from '../Admin';

@Module({
    imports: [
        Admin
    ],
    providers: [],
    controllers: [
        IndexController
    ]
})
export class App {}