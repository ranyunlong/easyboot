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
    isFile,
    isRequired,
    Upload,
    File
} from '../../../../../src'
import { UserService } from '../services/UserService';
import { resolve } from 'path'
import { UserEntity } from '../entites/UserEntity';
import { UPicEntity } from '../entites/UPicEntity';

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

    @Upload({
        multiples: false,
        keepExtensions: true,
        fileType: ['jpg', 'png'],
        uploadDir: resolve('test', 'uploads'),
        hash: 'md5'
    })
    @PostMapping
    public upload(@RequestBody upicEntity: UPicEntity) {
        return {
            data: upicEntity.uPic.toJSON(),
            msg: 'success',
            code: 0
        }
    }
}