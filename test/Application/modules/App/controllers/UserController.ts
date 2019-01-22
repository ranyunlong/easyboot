import { RequestMapping, GetMapping, PostMapping, HttpServletRequest, ServletRequest, HttpServletResponse, ServletResponse, StatusCode, StatusMessage, Exception, HttpException, ExceptionCapture, ContentType, RequestQuery, isRequired, isEmail, isBase64, isFloat, isInt, RequestBody, isNumeric, RequestParam, isLength, Upload, isFile } from '../../../../../src'
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
        return query
    }

    @GetMapping
    @ContentType('application/json')
    public test(
        @RequestQuery query: UserEntity
    ) {
        return query
    }

    @PostMapping
    public save(
        @RequestBody({a: isInt, b: isEmail}) body: UserEntity
    ) {
        return body
    }

    @GetMapping('info/:id/:name')
    public info(
        @RequestParam({
            id: isInt,
            name: isLength('name长度必须6-10位', { max: 10, min: 6 })
        }) param: any
    ) {
        return param || 'null'
    }

    @Upload({
        maxFileSize: 2222
    })
    @PostMapping
    public upload(@RequestBody({
        file: [isFile, isRequired]
    }) body: any) {
        return body || 'null'
    }
}