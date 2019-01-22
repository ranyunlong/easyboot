"use strict";
/**
 * @module StatusCode
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
/**
 * StatusCode decorator
 *
 * The decorator apply to Contorllor propertys, use to set response status code.
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
 *     @StatusCode(400)
 *     public async test(){}
 *
 *     @GetMapping
 *     @StatusCode(300)
 *     public async test1(){}
 * }
 * ```
 */
function StatusCode(statusCode) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.STATUS_CODE, statusCode, target.constructor, propertyKey);
    };
}
exports.StatusCode = StatusCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHVzQ29kZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVjb3JhdG9ycy9TdGF0dXNDb2RlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsc0VBQTJEO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLFVBQWtCO0lBQ3pDLE9BQU8sQ0FBQyxNQUFjLEVBQUUsV0FBbUIsRUFBUSxFQUFFO1FBQ2pELE9BQU8sQ0FBQyxjQUFjLENBQUMsOEJBQVUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7SUFDL0YsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQUpELGdDQUlDIn0=