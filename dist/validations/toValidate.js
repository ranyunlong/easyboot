"use strict";
/**
 * @module toValidate
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
/**
 * validate
 * @param key
 * @param value
 * @param validations
 */
function validate(key, value, validations) {
    if (Array.isArray(validations)) {
        validations.forEach((validator) => {
            if (typeof validator === 'function') {
                validator().toValidate(value, key);
            }
            else {
                validator.toValidate(value, key);
            }
        });
    }
    else if (typeof validations === 'function') {
        validations().toValidate(value, key);
    }
    else {
        validations.toValidate(value, key);
    }
}
/**
 * validateEntity
 * validate entity
 * @param originData
 * @param Entity
 */
function validateEntity(originData, Entity) {
    const rules = Reflect.getMetadata(metadata_constant_1.BASE.VALIDATE, Entity);
    const result = {};
    Object.keys(rules).forEach((key) => {
        const value = result[key] = originData[key];
        validate(key, value, rules[key]);
    });
    return result;
}
/**
 * toValidate
 * validate entity or validations
 * @param originData
 * @param metadata
 * @param Entity
 */
function toValidate(originData, metadata, Entity) {
    const result = {};
    if (Reflect.getMetadata(metadata_constant_1.BASE.ENTITY, Entity))
        return validateEntity(originData, Entity);
    const { key, validations, rules } = metadata;
    if (key && validations) {
        const value = originData[key];
        validate(key, value, validations);
        return value;
    }
    else if (rules) {
        Object.keys(rules).forEach((key) => {
            const value = result[key] = originData[key];
            validate(key, value, rules[key]);
        });
        return result;
    }
    return originData;
}
exports.toValidate = toValidate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9WYWxpZGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWxpZGF0aW9ucy90b1ZhbGlkYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFLSCxzRUFBc0Q7QUFFckQ7Ozs7O0dBS0c7QUFDSixTQUFTLFFBQVEsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLFdBQW1FO0lBQzdHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUM1QixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxPQUFPLFNBQVMsS0FBSyxVQUFVLEVBQUU7Z0JBQ2pDLFNBQVMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDckM7aUJBQU07Z0JBQ0gsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7YUFDbkM7UUFDTCxDQUFDLENBQUMsQ0FBQTtLQUNMO1NBQU0sSUFBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7UUFDMUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtLQUN2QztTQUFNO1FBQ0gsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUE7S0FDckM7QUFDTCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxTQUFTLGNBQWMsQ0FBQyxVQUFrQyxFQUFFLE1BQWE7SUFDckUsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyx3QkFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN4RCxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUE7SUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMvQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzNDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ3BDLENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxNQUFNLENBQUE7QUFDakIsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxVQUFrQyxFQUFFLFFBQTRCLEVBQUUsTUFBYTtJQUN0RyxNQUFNLE1BQU0sR0FBUSxFQUFFLENBQUE7SUFDdEIsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLHdCQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUFFLE9BQU8sY0FBYyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUN2RixNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsR0FBRyxRQUFRLENBQUE7SUFDNUMsSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFO1FBQ3BCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUM3QixRQUFRLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUNqQyxPQUFPLEtBQUssQ0FBQztLQUNoQjtTQUFNLElBQUksS0FBSyxFQUFFO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMvQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzNDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3BDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxNQUFNLENBQUE7S0FDaEI7SUFDRCxPQUFPLFVBQVUsQ0FBQTtBQUNyQixDQUFDO0FBaEJELGdDQWdCQyJ9