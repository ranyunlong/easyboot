import {
    Controller,
    RequestMapping,
    GetMapping,
    ServletRequest,
    Request,
    ServletResponse,
    Response,
    RequestBody,
    RequestQuery
} from '../../../../../src'
import { UserService } from '../services/UserService';
import { TestEntity } from '../entites/TestEntity';

@Controller
@RequestMapping('/admin/test')
export class TestController {
    constructor(private userService: UserService) {}
    @GetMapping('/')
    public async index(
        @ServletRequest request: Request,
        @ServletResponse response: Response,
        @RequestQuery body: TestEntity
    ) {
        response.type = 'text/css'
        return this.userService.name
    }
}