import {
    Controller,
    RequestMapping,
    GetMapping,
    HttpServletRequest,
    Request,
    HttpServletResponse,
    Response
} from '../../../../../src'

@Controller
@RequestMapping('admin')
export class IndexController {
    @GetMapping('/')
    public async index(
        @HttpServletRequest request: Request,
        @HttpServletResponse response: Response
    ) {
        response.type = 'text/css'
        return '11'
    }
}