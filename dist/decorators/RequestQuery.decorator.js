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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdFF1ZXJ5LmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL1JlcXVlc3RRdWVyeS5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILHNFQUEyRDtBQXlEM0QsU0FBZ0IsWUFBWSxDQUFDLEdBQUcsSUFBVztJQUN2QyxTQUFTLFNBQVMsQ0FBQyxNQUFjLEVBQUUsV0FBbUIsRUFBRSxjQUFzQjtRQUMxRSxNQUFNLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQTtRQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxjQUFjLENBQUMsOEJBQVUsQ0FBQyxhQUFhLEVBQUU7Z0JBQzdDLEtBQUssRUFBRSxjQUFjO2dCQUNyQixHQUFHO2dCQUNILFdBQVc7YUFDZCxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7U0FDdEM7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzFCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO2dCQUN6QixPQUFPLENBQUMsY0FBYyxDQUFDLDhCQUFVLENBQUMsYUFBYSxFQUFFO29CQUM3QyxLQUFLLEVBQUUsY0FBYztvQkFDckIsR0FBRztpQkFDTixFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7YUFDdEM7aUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxjQUFjLENBQUMsOEJBQVUsQ0FBQyxhQUFhLEVBQUU7b0JBQzdDLEtBQUssRUFBRSxjQUFjO29CQUNyQixLQUFLLEVBQUUsR0FBRztpQkFDYixFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7YUFDdEM7U0FDSjthQUFNO1lBQ0gsT0FBTyxDQUFDLGNBQWMsQ0FBQyw4QkFBVSxDQUFDLGFBQWEsRUFBRTtnQkFDN0MsS0FBSyxFQUFFLGNBQWM7YUFDeEIsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1NBQ3RDO0lBQ0wsQ0FBQztJQUVELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbkIsT0FBUSxTQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUE7S0FDckM7U0FBTTtRQUNILE9BQU8sU0FBUyxDQUFBO0tBQ25CO0FBQ0wsQ0FBQztBQWpDRCxvQ0FpQ0MifQ==