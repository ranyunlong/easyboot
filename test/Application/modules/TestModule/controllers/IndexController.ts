import { Controller, GetMapping, RequestQuery, RequestParam, IsInt, isIn, isInt, RequestBody, PostMapping, Upload, StatusMessage, StatusCode, ContentType, Exception, ExceptionCapture, HttpException } from '../../../../../src';
import { Test1QueryEntity } from '../entites/Test1QueryEntity';
import { UploadEntity } from '../entites/UploadEntity';
import { ResponseException } from '../exception/ResponseException';

@Controller
export class IndexController {
    @GetMapping('/test1/:id')
    @StatusMessage('hh')
    @StatusCode(300)
    @ContentType('json')
    @Exception(new HttpException({ statusCode: 200, message: 'Bad Request', data: { code: 0 } }))
    public test1(@RequestQuery query: Test1QueryEntity, @RequestParam('id', isInt) id: Number) {
        return id
    }

    @PostMapping
    @Upload({
        fileType: 'jpg'
    })
    public upload(@RequestBody body: UploadEntity) {
        return body.file.toJSON()
    }
}