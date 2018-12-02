import { UserService } from '../../home/services/UserServices';
export declare class IndexController {
    userService: UserService;
    constructor(userService: UserService);
    index(params: any, body: any): Promise<void>;
}
