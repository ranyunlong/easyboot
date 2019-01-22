"use strict";
/**
 * @class RouterConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class RouterConfiguration {
    constructor(configuration) {
        /**
         * When `true` the regexp will be case sensitive. (default: `false`)
         */
        this.sensitive = false;
        /**
         * When `true` the regexp allows an optional trailing delimiter to match. (default: `false`)
         */
        this.strict = false;
        /**
         * When `true` the regexp will match to the end of the string. (default: `true`)
         */
        this.end = true;
        /**
         * When `true` the regexp will match from the beginning of the string. (default: `true`)
         */
        this.start = true;
        /**
         * Sets the final character for non-ending optimistic matches. (default: `/`)
         */
        this.delimiter = '/';
        if (typeof configuration !== 'object' || Array.isArray(configuration))
            return;
        Object.keys(configuration).forEach((key) => {
            this[key] = configuration[key];
        });
    }
}
exports.RouterConfiguration = RouterConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyQ29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWd1cmF0aW9ucy9Sb3V0ZXJDb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7QUFFSCxNQUFhLG1CQUFtQjtJQUM1QixZQUFZLGFBQW1DO1FBTy9DOztXQUVHO1FBQ0ksY0FBUyxHQUFZLEtBQUssQ0FBQztRQUVsQzs7V0FFRztRQUNJLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFFL0I7O1dBRUc7UUFDSSxRQUFHLEdBQVksSUFBSSxDQUFDO1FBRTNCOztXQUVHO1FBQ0ksVUFBSyxHQUFZLElBQUksQ0FBQztRQUU3Qjs7V0FFRztRQUNJLGNBQVMsR0FBVyxHQUFHLENBQUM7UUE3QjNCLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQUUsT0FBTztRQUM5RSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQThCLEVBQUUsRUFBRTtZQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQStCSjtBQXJDRCxrREFxQ0MifQ==