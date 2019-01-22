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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhjZXB0aW9uLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL0V4Y2VwdGlvbi5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUdILHNFQUE0RDtBQUM1RCx5REFBc0Q7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFnQixTQUFTLENBQUMsU0FBd0I7SUFDOUMsT0FBTyxDQUFDLE1BQWMsRUFBRSxXQUFtQixFQUFRLEVBQUU7UUFDakQsTUFBTSxLQUFLLEdBQUcsSUFBSSw2QkFBYSxDQUFDLDREQUE0RCxFQUFFO1lBQzFGLEtBQUssRUFBRSxXQUFXO1lBQ2xCLE1BQU0sRUFBRSxDQUFFLG1CQUFtQixDQUFFO1NBQ2xDLENBQUMsQ0FBQTtRQUNGLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQy9CLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQTtTQUNoQjtRQUNELE9BQU8sQ0FBQyxjQUFjLENBQUMsOEJBQVUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDNUYsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQVhELDhCQVdDIn0=