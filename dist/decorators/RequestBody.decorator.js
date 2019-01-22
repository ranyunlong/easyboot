"use strict";
/**
 * @module RequestBody
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
function RequestBody(...args) {
    function decorator(target, propertyKey, parameterIndex) {
        const [key, validations] = args;
        if (args.length === 2) {
            Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_BODY, {
                index: parameterIndex,
                key,
                validations
            }, target.constructor, propertyKey);
        }
        else if (args.length === 1) {
            if (typeof key === 'string') {
                Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_BODY, {
                    index: parameterIndex,
                    key
                }, target.constructor, propertyKey);
            }
            else if (typeof key === 'object') {
                Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_BODY, {
                    index: parameterIndex,
                    rules: key
                }, target.constructor, propertyKey);
            }
        }
        else {
            Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_BODY, {
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
exports.RequestBody = RequestBody;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdEJvZHkuZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RlY29yYXRvcnMvUmVxdWVzdEJvZHkuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFFSCxzRUFBMkQ7QUF5RDNELFNBQWdCLFdBQVcsQ0FBQyxHQUFHLElBQVc7SUFDdEMsU0FBUyxTQUFTLENBQUMsTUFBYyxFQUFFLFdBQW1CLEVBQUUsY0FBc0I7UUFDMUUsTUFBTSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUE7UUFDL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNuQixPQUFPLENBQUMsY0FBYyxDQUFDLDhCQUFVLENBQUMsWUFBWSxFQUFFO2dCQUM1QyxLQUFLLEVBQUUsY0FBYztnQkFDckIsR0FBRztnQkFDSCxXQUFXO2FBQ2QsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1NBQ3RDO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMxQixJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDekIsT0FBTyxDQUFDLGNBQWMsQ0FBQyw4QkFBVSxDQUFDLFlBQVksRUFBRTtvQkFDNUMsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLEdBQUc7aUJBQ04sRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBO2FBQ3RDO2lCQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO2dCQUNoQyxPQUFPLENBQUMsY0FBYyxDQUFDLDhCQUFVLENBQUMsWUFBWSxFQUFFO29CQUM1QyxLQUFLLEVBQUUsY0FBYztvQkFDckIsS0FBSyxFQUFFLEdBQUc7aUJBQ2IsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBO2FBQ3RDO1NBQ0o7YUFBTTtZQUNILE9BQU8sQ0FBQyxjQUFjLENBQUMsOEJBQVUsQ0FBQyxZQUFZLEVBQUU7Z0JBQzVDLEtBQUssRUFBRSxjQUFjO2FBQ3hCLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQTtTQUN0QztJQUNMLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ25CLE9BQVEsU0FBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBO0tBQ3JDO1NBQU07UUFDSCxPQUFPLFNBQVMsQ0FBQTtLQUNuQjtBQUNMLENBQUM7QUFqQ0Qsa0NBaUNDIn0=