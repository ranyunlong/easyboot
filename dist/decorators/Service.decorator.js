"use strict";
/**
 * @module Service
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
function Service(arg) {
    if (typeof arg === 'boolean') {
        return (target) => {
            Reflect.defineMetadata(metadata_constant_1.BASE.GLOBAL_SERVICE, true, target);
            Reflect.defineMetadata(metadata_constant_1.BASE.SERVICE, true, target);
        };
    }
    else if (typeof arg === 'function') {
        Reflect.defineMetadata(metadata_constant_1.BASE.SERVICE, true, arg);
    }
}
exports.Service = Service;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVjb3JhdG9ycy9TZXJ2aWNlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7O0FBRUgsc0VBQXFEO0FBc0JyRCxTQUFnQixPQUFPLENBQUMsR0FBUTtJQUM1QixJQUFJLE9BQU8sR0FBRyxLQUFLLFNBQVMsRUFBRTtRQUMxQixPQUFPLENBQTZCLE1BQWlCLEVBQW9CLEVBQUU7WUFDdkUsT0FBTyxDQUFDLGNBQWMsQ0FBQyx3QkFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDMUQsT0FBTyxDQUFDLGNBQWMsQ0FBQyx3QkFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFBO0tBQ0o7U0FBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVUsRUFBRTtRQUNsQyxPQUFPLENBQUMsY0FBYyxDQUFDLHdCQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNuRDtBQUNMLENBQUM7QUFURCwwQkFTQyJ9