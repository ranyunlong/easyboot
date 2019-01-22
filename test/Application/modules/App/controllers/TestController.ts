import { Controller, RequestMapping, GetMapping, PostMapping, ContentType, Exception, HttpException, ExceptionCapture, RequestParam, RequestBody, RequestQuery, isRequired, isEmail, HttpServletSession, Session } from '../../../../../src'
import { UserService } from '../services/UserService';

@RequestMapping('app/test')
export class TestController {
    constructor(public userService: UserService) {}

    @GetMapping
    public list(@RequestQuery({name: isEmail}) query: string) {
        return 'list';
    }

    @PostMapping
    @ContentType('js')
    @Exception(new HttpException({}))
    public save(@RequestBody body: any) {
        return 'save'
    }

    @GetMapping
    @ContentType('json')
    @ExceptionCapture(HttpException)
    public test1(
        @HttpServletSession session: Session<any>
    ): string {
        return session
    }

    @GetMapping(':id')
    @ContentType('json')
    @ExceptionCapture(HttpException)
    public test2(
        @RequestParam param: any,
        @HttpServletSession session: Session<any>
    ): string {
        session.aa = param
        return session
    }
}