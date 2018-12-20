import { HttpException } from '../../../../../src';

export class ResponseException extends HttpException {
    constructor(error: HttpException) {
        super(error)
        this.statusCode = 400
        this.message = 'Bad Request'
        const data = this.data
        this.data = {
            code: 0,
            ...data
        }
    }
}