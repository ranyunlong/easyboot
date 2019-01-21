import { Service } from '../../../../../src';
import { TestService } from './TestService';

@Service
export class UserService {
    public async add() {
        return '1'
    }
    public save() {
        return;
    }
}