import { RequestMapping, Controller, GetMapping, RequestParam, RequestBody, PostMapping, RequestQuery, isInt, isRequired, isBase64 } from '../../../../../src'
import { UserService } from '../../home/services/UserServices';
import { UserEntity } from '../entitys/UserEntity';
import { TestService } from '../services/TestService';

@Controller
@RequestMapping('admin')
export class IndexController {
    constructor(private userService: UserService, private testService: TestService) {}
    @PostMapping('users')
    public async index(
        @RequestBody(UserEntity) user: UserEntity
    ) {
        return user;
    }

    @GetMapping(':id')
    public async id(
        @RequestParam('id', isInt('必须为整数')) id: number,
        @RequestQuery(UserEntity) query: UserEntity
    ) {
        return query
    }
}