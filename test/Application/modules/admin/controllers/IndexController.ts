import { RequestMapping, Controller, GetMapping, RequestParam, RequestBody, PostMapping } from '../../../../../src'
import { UserService } from '../../home/services/UserServices';

@Controller
@RequestMapping('admin')
export class IndexController {
    constructor(public userService: UserService) {}
    @GetMapping('users')
    @PostMapping('users')
    public async index() {
        return 100;
    }
}