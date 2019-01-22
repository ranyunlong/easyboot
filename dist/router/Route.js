"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathToRegexp = require("path-to-regexp");
const metadata_constant_1 = require("../constants/metadata.constant");
class Route {
    constructor(router, options) {
        this.keys = [];
        if (Array.isArray(options) || typeof options !== 'object')
            return;
        Object.keys(options).forEach((key) => {
            this[key] = options[key];
        });
        this.controllerMapping = Reflect.getMetadata(metadata_constant_1.BASE.CONTROLLER, this.Controller);
        const paths = [this.controllerMapping.path, this.path || this.propertyKey];
        this.regexp = pathToRegexp('/' + paths.join('/').replace(/\/{2,}/, '/'), this.keys, router.configs || {});
    }
}
exports.Route = Route;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcm91dGVyL1JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsK0NBQStDO0FBQy9DLHNFQUFzRDtBQUd0RCxNQUFhLEtBQUs7SUFZZCxZQUFZLE1BQWMsRUFBRSxPQUFjO1FBTm5DLFNBQUksR0FBVyxFQUFFLENBQUM7UUFPckIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7WUFBRSxPQUFPO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBZ0IsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDNUIsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyx3QkFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDOUUsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzFFLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzdHLENBQUM7Q0FDSjtBQXJCRCxzQkFxQkMifQ==