import { Controller, RequestMapping, GetMapping, PostMapping, HttpServletRequest, ServletRequest, HttpServletResponse, ServletResponse, StatusCode, StatusMessage, Exception, HttpException, ExceptionCapture, ContentType } from '../../../../../src'

@Controller
@RequestMapping('app/user')
export class UserController {
    @GetMapping
    @StatusCode(300)
    @StatusMessage('test')
    @ExceptionCapture(HttpException)
    @ContentType('html')
    public list(@HttpServletResponse response: ServletResponse): string {
        return 'list';
    }

    @PostMapping
    public save(@HttpServletRequest request: ServletRequest) {
        return 'save'
    }
}