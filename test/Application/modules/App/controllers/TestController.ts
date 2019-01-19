import { Controller, RequestMapping, GetMapping, PostMapping, ContentType, Exception, HttpException, ExceptionCapture } from '../../../../../src'
import { UserService } from '../services/UserService';

@Controller
@RequestMapping('app/test')
export class TestController {
    constructor(public userService: UserService) {}

    @GetMapping
    public list() {
        return 'list';
    }

    @PostMapping
    @ContentType('js')
    @Exception(new HttpException({}))
    public save() {
        return 'save'
    }

    @GetMapping(':id')
    @ContentType('html')
    @ExceptionCapture(HttpException)
    public test(): string {
        return 'test'
    }
}