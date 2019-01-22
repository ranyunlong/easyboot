"use strict";
/**
 * @module ExceptionCapture
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
const DevStackTrace_1 = require("../core/DevStackTrace");
/**
 * ExceptionCapture decorator
 *
 * The decorator apply to Contorllor propertys, Used to capture exception.
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
 *     @ExceptionCapture(HttpException)
 *     public test(){}
 *
 *     @GetMapping
 *     @ExceptionCapture(CustomException)
 *     public async test1(){}
 * }
 * ```
 */
function ExceptionCapture(Exception) {
    return (target, propertyKey) => {
        const trace = new DevStackTrace_1.DevStackTrace(`Invalid decorator: @ExceptionCapture(), 'argument must be Function.`, {
            value: 'ExceptionCapture',
            scopes: ['meta.decorator.ts']
        });
        if (typeof Exception !== 'function') {
            trace.throw();
        }
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.EXCEPTION_CAPTURE, Exception, target.constructor, propertyKey);
    };
}
exports.ExceptionCapture = ExceptionCapture;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhjZXB0aW9uQ2FwdHVyZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVjb3JhdG9ycy9FeGNlcHRpb25DYXB0dXJlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBR0gsc0VBQTREO0FBQzVELHlEQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFNBQW1DO0lBQ2hFLE9BQU8sQ0FBQyxNQUFjLEVBQUUsV0FBbUIsRUFBUSxFQUFFO1FBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksNkJBQWEsQ0FBQyxxRUFBcUUsRUFBRTtZQUNuRyxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixDQUFDO1NBQ2hDLENBQUMsQ0FBQTtRQUNGLElBQUksT0FBTyxTQUFTLEtBQUssVUFBVSxFQUFFO1lBQ2pDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQTtTQUNoQjtRQUNELE9BQU8sQ0FBQyxjQUFjLENBQUMsOEJBQVUsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUNwRyxDQUFDLENBQUE7QUFDTCxDQUFDO0FBWEQsNENBV0MifQ==