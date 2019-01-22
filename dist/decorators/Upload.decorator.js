"use strict";
/**
 * @module RquestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_constant_1 = require("../constants/metadata.constant");
function Upload(...args) {
    if (args.length === 1) {
        return (target, propertyKey, descriptor) => {
            Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_FILE, args[0], target.constructor, propertyKey);
        };
    }
    else {
        const [target, propertyKey, descriptor] = args;
        Reflect.defineMetadata(metadata_constant_1.CONTROLLER.REQUEST_FILE, {}, target.constructor, propertyKey);
    }
}
exports.Upload = Upload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXBsb2FkLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL1VwbG9hZC5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOztBQUVILHNFQUE0RDtBQTZCNUQsU0FBZ0IsTUFBTSxDQUFDLEdBQUcsSUFBVztJQUNqQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ25CLE9BQU8sQ0FBSSxNQUFjLEVBQUUsV0FBbUIsRUFBRSxVQUFzQyxFQUFxQyxFQUFFO1lBQ3pILE9BQU8sQ0FBQyxjQUFjLENBQUMsOEJBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDN0YsQ0FBQyxDQUFBO0tBQ0o7U0FBTTtRQUNILE1BQU0sQ0FBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBRSxHQUFHLElBQUksQ0FBQTtRQUNoRCxPQUFPLENBQUMsY0FBYyxDQUFDLDhCQUFVLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0tBQ3ZGO0FBQ0wsQ0FBQztBQVRELHdCQVNDIn0=