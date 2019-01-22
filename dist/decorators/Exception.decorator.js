"use strict";
/**
 * @module Exception
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const DevStackTrace_1 = require("../core/DevStackTrace");
/**
 * Exception decorator
 *
 * The decorator apply to Contorllor propertys, Used to handle exception.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public async index(){}
 *
 *     @GetMapping
 *     @Exception(new HttpException({ statusCode: 404, data: {error: 'invald param'}}))
 *     public async test(){}
 *
 *     @GetMapping
 *     @Exception(new CustomException({ data: {error: 'invald param'}})
 *     public async test1(){}
 * }
 * ```
 */
function Exception(Exception) {
    return (target, propertyKey) => {
        const trace = new DevStackTrace_1.DevStackTrace(`Invalid decorator: @Exception(), 'argument must be object.`, {
            value: 'Exception',
            scopes: ['meta.decorator.ts']
        });
        if (typeof Exception !== 'object') {
            trace.throw();
        }
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.EXCEPTION, Exception, target.constructor, propertyKey);
    };
}
exports.Exception = Exception;
//# sourceMappingURL=Exception.decorator.js.map