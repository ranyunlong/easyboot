"use strict";
/**
 * @module Validate
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
/**
 * Validate decorator
 *
 * The decorator apply to Entity.
 *
 * Example
 * ```
 * @Entity
 * export class UserEntity {
 * }
 * ```
 */
function Validate(validation) {
    return (target, propertyKey) => {
        const rules = Reflect.getMetadata(metadata_constant_1.BASE.VALIDATE, target.constructor) || {};
        rules[propertyKey] = validation;
        Reflect.defineMetadata(metadata_constant_1.BASE.VALIDATE, rules, target.constructor);
    };
}
exports.Validate = Validate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsaWRhdGUuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlY29yYXRvcnMvVmFsaWRhdGUuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFFRixzRUFBcUQ7QUFJdEQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxTQUFnQixRQUFRLENBQUMsVUFBa0U7SUFDdkYsT0FBTyxDQUFDLE1BQWMsRUFBRSxXQUE0QixFQUFRLEVBQUU7UUFDMUQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyx3QkFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQzFFLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxVQUFVLENBQUE7UUFDL0IsT0FBTyxDQUFDLGNBQWMsQ0FBQyx3QkFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3BFLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFORCw0QkFNQyJ9