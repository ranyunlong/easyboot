import { Controller, RequestMapping, GetMapping, PostMapping, HttpServletRequest, ServletRequest, HttpServletResponse, ServletResponse, StatusCode, StatusMessage, Exception, HttpException, ExceptionCapture, ContentType, RequestQuery, isRequired, isEmail, isBase64, isFloat, isInt } from '../../../../../src'
import { UserService } from '../services/UserService';
import { UserEntity } from '../entitys/UserEntity';

@RequestMapping('app/user')
export class UserController {
    constructor(public userService: UserService) {}
    @GetMapping
    @StatusCode(300)
    @StatusMessage('test')
    // @ExceptionCapture(MyException)
    @ContentType('json')
    public async list(
        @HttpServletResponse response: ServletResponse,
        @RequestQuery({name: isRequired, email: [isRequired, isEmail]}) query: any
    ) {
        return await this.userService.add()
    }

    @GetMapping
    public test(
        @RequestQuery query: UserEntity
    ) {
        return 'xx';
    }

    @PostMapping
    public save(@HttpServletRequest request: ServletRequest) {
        return 'save'
    }
}