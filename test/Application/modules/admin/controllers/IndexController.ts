import { RequestMapping, Controller, GetMapping, RequestParam, RequestBody, PostMapping, RequestQuery, isInt, isRequired, isBase64, StatusCode, StatusMessage, ResponseHeader, ResponseHeaders, ContentType, HttpException, Exception, ExceptionCatch } from '../../../../../src'
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
    @StatusCode(200)
    @StatusMessage('XXX')
    @ResponseHeaders({ xx : 'yy', zz: 'dd'})
    @ResponseHeader('name', 'xxx')
    @ContentType('text')
    @ExceptionCatch(HttpException)
    public async id(
        @RequestParam('id', [isInt]) id: number,
        @RequestQuery(UserEntity) query: UserEntity
    ) {
        return query
    }
}