import { Controller, RequestMapping, GetMapping, RequestParam, isInt, RequestBody, PostMapping, RquestQuery, isUUID, isRequired } from '../../../../../src'
import { UserService } from '../services/UserService';
import { UserEntity } from '../entites/UserEntity';
import { Uidservices } from '../services/Uidservices';

@Controller
@RequestMapping('admin')
export class IndexController {
    constructor(public uidService: Uidservices) {}

    @PostMapping('test')
    @GetMapping('test')
    public async test() {
        return 11;
    }

    @GetMapping(':id')
    public async userlist(@RequestParam('id', isInt) param: Number) {
        return 'xx';
    }

    @GetMapping('/:id/:name')
    public user(@RequestParam param: UserEntity) {
        return param;
    }
}