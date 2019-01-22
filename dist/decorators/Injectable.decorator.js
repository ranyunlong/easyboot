"use strict";
/**
 * @module Injectable
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
/**
 * Injectable decorator
 *
 * The decorator apply to any class.
 *
 * Example
 * ```
 * @Injectable
 * export class IndexController {}
 * ```
 */
function Injectable(target) {
    Reflect.defineMetadata(metadata_constant_1.BASE.INJECTABLE, true, target);
}
exports.Injectable = Injectable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5qZWN0YWJsZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVjb3JhdG9ycy9JbmplY3RhYmxlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsc0VBQXNEO0FBRXREOzs7Ozs7Ozs7O0dBVUc7QUFDSCxTQUFnQixVQUFVLENBQTZCLE1BQWlCO0lBQ3BFLE9BQU8sQ0FBQyxjQUFjLENBQUMsd0JBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3pELENBQUM7QUFGRCxnQ0FFQyJ9