import { RequestMapping, GetMapping, RquestQuery, RequestBody, PostMapping, DeleteMapping, RequestParam, isJSON, isInt, isRequired } from '../../../../../src';
import { UserQueryEntity } from '../entites/UserQueryEntity';
import { UserEntity } from '../entites/UserEntity';

@RequestMapping('app')
export class IndexController {
    @GetMapping('list')
    public async list(@RquestQuery query: UserQueryEntity) {
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