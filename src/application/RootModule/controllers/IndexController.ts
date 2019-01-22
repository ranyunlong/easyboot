import { RequestMapping, GetMapping } from '@easyboot/core';

@RequestMapping('/')
export class IndexController {
    @GetMapping
    public async index() {
        return 100;
    }
}