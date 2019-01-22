"use strict";
/**
 * @module RequestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
function RequestQuery(...args) {
    function decorator(target, propertyKey, parameterIndex) {
        const [key, validations] = args;
        if (args.length === 2) {
            Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_QUERY, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey);
        }
        else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_QUERY, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey);
            }
            else if (typeof key === 'object') {
                Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_QUERY, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey);
            }
        }
        else {
            Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_QUERY, {
                index: parameterIndex
            }, target.constructor, propertyKey);
        }
    }
    if (args.length === 3) {
        return decorator(...args);
    }
    else {
        return decorator;
    }
}
exports.RequestQuery = RequestQuery;
//# sourceMappingURL=RequestQuery.decorator.js.map