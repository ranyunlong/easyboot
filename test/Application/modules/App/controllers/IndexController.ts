import { RequestMapping, GetMapping, RequestQuery, RequestBody, PostMapping, DeleteMapping, RequestParam, isJSON, isInt, isRequired, Controller } from '../../../../../src';
import { UserQueryEntity } from '../entites/UserQueryEntity';
import { UserEntity } from '../entites/UserEntity';
import { UserService } from '../../Admin/services/UserService';

@Controller
@RequestMapping('app')
export class IndexController {
    constructor(private userService: UserService) {}

    @GetMapping
    public list(@RequestQuery query: UserQueryEntity) {
        return query;
    }

    @GetMapping
    public list1(@RequestQuery({id: isInt}) query: UserQueryEntity) {
        return query;
    }

    @PostMapping('save')
    public async save(@RequestBody body: UserEntity) {
        return body;
    }

    @GetMapping('/userinfo/:id')
    public async userinfo(@RequestParam({id:  isInt}) id: number) {
        return id
    }

    @DeleteMapping('/delete')
    public async delete(@RequestQuery('id', isInt) id: number) {
        return id;
    }
}