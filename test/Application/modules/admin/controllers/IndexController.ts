import { RequestMapping, Controller, GetMapping, RequestParams, RequestBody, PostMapping, RequestPathParams, MapParams } from '../../../../../src'
import { UserService } from '../../home/services/UserServices';
import { UserEntity } from '../entitys/UserEntity';

@Controller
@RequestMapping('admin')
export class IndexController {
    constructor(private userService: UserService) {}
    @GetMapping('users')
    @PostMapping('users')
    public async index(
        @RequestParams() user: UserEntity
    ) {
        return 10;
    }

    @GetMapping(':id')
    @PostMapping(':id')
    public async id(
        @RequestBody(UserEntity) user: UserEntity,
        @RequestPathParams(['id', 'name']) pathParams: MapParams<{
            name: string;
            id: number;
        }>
    ) {
        return pathParams
    }

    @GetMapping(':id/:date')
    public async news(@RequestPathParams(['id', 'date']) pathParams: MapParams<{
        name: string;
        id: number;
    }>) {
        return pathParams
    }
}