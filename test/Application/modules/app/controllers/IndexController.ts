import { RequestMapping, GetMapping, RquestQuery, RequestBody, PostMapping, DeleteMapping, RequestParam, isJSON, isInt, isRequired, Controller } from '../../../../../src';
import { UserQueryEntity } from '../entites/UserQueryEntity';
import { UserEntity } from '../entites/UserEntity';
import { UserService } from '../../admin/services/UserService';

@Controller
@RequestMapping('app')
export class IndexController {
    constructor(private userService: UserService) {}
    @GetMapping
    public list(@RquestQuery query: UserQueryEntity) {
        return query;
    }

    @PostMapping('save')
    public async save(@RequestBody body: UserEntity) {
        return body;
    }

    @GetMapping('/userinfo/:id')
    public async userinfo(@RequestParam('id', isInt) id: number) {
        return id
    }

    @DeleteMapping('/delete')
    public async delete(@RquestQuery('id', [isJSON, isRequired]) id: number) {
        return id;
    }
}