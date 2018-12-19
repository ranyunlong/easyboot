import {
    Controller,
    RequestMapping,
    GetMapping,
    HttpServletRequest,
    Request,
    HttpServletResponse,
    Response,
    PostMapping,
    RequestBody,
    isLength,
    isRequired,
    isFile
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

    @PostMapping
    public upload(@RequestBody('file', isFile('xx')) body: any) {
        return 'upload'
    }

}