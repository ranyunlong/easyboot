import {
    Controller,
    RequestMapping,
    GetMapping,
    HttpServletRequest,
    Request,
    HttpServletResponse,
    Response
} from '../../../../../src'
import { UserService } from '../services/UserService';

@Controller
@RequestMapping('/admin/user')
export class IndexController {
    constructor(private userService: UserService) {
        userService.name = 'aa'
    }
    @GetMapping('/')
    public async index(
        @HttpServletRequest request: Request,
        @HttpServletResponse response: Response
    ) {
        response.type = 'text/css'
        return this.userService.name
    }
}