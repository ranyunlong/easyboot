import { HttpException } from '../../../../../src';

export class MyException extends HttpException {
    constructor(error: HttpException) {
        super({
            data: {
                message: error.data
            }
        })
    }
}