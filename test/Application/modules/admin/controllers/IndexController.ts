import { RequestMapping, Controller, GetMapping, RequestParam, RequestBody, PostMapping, RequestQuery, isInt, isRequired } from '../../../../../src'
import { UserService } from '../../home/services/UserServices';
import { UserEntity } from '../entitys/UserEntity';
import { TestService } from '../services/TestService';

@Controller
@RequestMapping('admin')
export class IndexController {
    constructor(private userService: UserService, public testService: TestService) {}
    @PostMapping('users')
    public async index(
        @RequestBody user: UserEntity
    ) {
        return 10;
    }

    @GetMapping(':id')
    public async id(
        @RequestParam({
            id: isInt('id必须为整数')
        }) params: any,
        @RequestQuery(UserEntity) query: UserEntity
    ) {
        return '22'
    }
}