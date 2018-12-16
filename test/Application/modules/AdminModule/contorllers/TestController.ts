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
@RequestMapping('/admin/test')
export class TestController {
    constructor(private userService: UserService) {}
    @GetMapping('/')
    public async index(
        @HttpServletRequest request: Request,
        @HttpServletResponse response: Response
    ) {
        response.type = 'text/css'
        return this.userService.name
    }
}