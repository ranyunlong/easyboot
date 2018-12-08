import { Controller, RequestMapping, GetMapping, RequestParam, isInt } from '../../../../../src'
import { UserService } from '../services/UserService';

@Controller
@RequestMapping('admin')
export class IndexController {
    constructor(private userService: UserService) {
        console.log(this.userService)
    }
    @GetMapping(':id')
    public async userlist(@RequestParam({id: isInt}) param: any) {
        return 'xx';
    }

    @GetMapping('test')
    public async test(@RequestParam param: any) {
        return 'xx';
    }
}