import { Controller, RequestMapping, GetMapping, PostMapping, ContentType, Exception, HttpException, ExceptionCapture, RequestParam, RequestBody, RequestQuery, isRequired, isEmail } from '../../../../../src'
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

    @GetMapping(':id')
    @ContentType('html')
    @ExceptionCapture(HttpException)
    public test(@RequestParam params: any): string {
        return 'test'
    }
}