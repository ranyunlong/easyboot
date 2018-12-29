import {
    Controller,
    RequestMapping,
    GetMapping,
    ServletRequest,
    Request,
    ServletResponse,
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
import { ArrayNumberEntity } from '../entites/ArrayNumberEntity';

@Controller
@RequestMapping('/admin/user')
export class UserController {
    constructor(private userService: UserService) {
        userService.name = 'aa'
    }
    @GetMapping('/')
    public async index(
        @ServletRequest request: Request,
        @ServletResponse response: Response
    ) {
        response.type = 'text/css'
        return this.userService.name
    }

    @PostMapping
    public save(@RequestBody ids: ArrayNumberEntity) {
        console.log(1)
        return 'save'
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