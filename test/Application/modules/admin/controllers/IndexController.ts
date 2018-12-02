import { RequestMapping, Controller, GetMapping, RequestParam, RequestBody, PostMapping } from '../../../../../src'
import { UserService } from '../../home/services/UserServices';
import { UserEntity } from '../entitys/UserEntity';

@Controller
@RequestMapping('admin')
export class IndexController {
    constructor(private userService: UserService) {
        console.log(this.userService)
    }
    @GetMapping('users')
    @PostMapping('users')
    public async index(@RequestBody(UserEntity) user: UserEntity) {
        return 100;
    }

    @GetMapping(':id')
    public async id() {
        return 1;
    }
}