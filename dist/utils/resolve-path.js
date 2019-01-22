"use strict";
/**
 * util resolve-path
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const httpError = require("http-errors");
const path_is_absolute_1 = require("./path-is-absolute");
const path_1 = require("path");
const UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
function default_1(rootPath, relativePath) {
    let path = relativePath;
    let root = rootPath;
    // root is optional, similar to root.resolve
    if (!relativePath) {
        path = rootPath;
        root = process.cwd();
    }
    if (root == null) {
        throw new TypeError('argument rootPath is required');
    }
    if (typeof root !== 'string') {
        throw new TypeError('argument rootPath must be a string');
    }
    if (path == null) {
        throw new TypeError('argument relativePath is required');
    }
    if (typeof path !== 'string') {
        throw new TypeError('argument relativePath must be a string');
    }
    // containing NULL bytes is malicious
    if (!!~path.indexOf('\0')) {
        throw httpError(400, 'Malicious Path');
    }
    // path should never be absolute
    if (path_is_absolute_1.default(path)) {
        throw httpError(400, 'Malicious Path');
    }
    // path outside root
    if (UP_PATH_REGEXP.test(path_1.normalize('.' + path_1.sep + path))) {
        throw httpError(403);
    }
    // join the relative path
    return path_1.normalize(path_1.join(path_1.resolve(root), path));
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS1wYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3Jlc29sdmUtcGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSDs7R0FFRztBQUVILHlDQUF3QztBQUN4Qyx5REFBeUM7QUFDekMsK0JBQW9EO0FBRXBELE1BQU0sY0FBYyxHQUFHLDRCQUE0QixDQUFBO0FBRW5ELG1CQUF3QixRQUFnQixFQUFFLFlBQXFCO0lBQzNELElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQTtJQUN2QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUE7SUFFbkIsNENBQTRDO0lBQzVDLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDZixJQUFJLEdBQUcsUUFBUSxDQUFBO1FBQ2YsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtLQUN2QjtJQUVELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtRQUNkLE1BQU0sSUFBSSxTQUFTLENBQUMsK0JBQStCLENBQUMsQ0FBQTtLQUN2RDtJQUVELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzFCLE1BQU0sSUFBSSxTQUFTLENBQUMsb0NBQW9DLENBQUMsQ0FBQTtLQUM1RDtJQUVELElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtRQUNkLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQTtLQUMzRDtJQUVELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzFCLE1BQU0sSUFBSSxTQUFTLENBQUMsd0NBQXdDLENBQUMsQ0FBQTtLQUNoRTtJQUVELHFDQUFxQztJQUNyQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkIsTUFBTSxTQUFTLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUE7S0FDekM7SUFFRCxnQ0FBZ0M7SUFDaEMsSUFBSSwwQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2hCLE1BQU0sU0FBUyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFBO0tBQ3pDO0lBRUQsb0JBQW9CO0lBQ3BCLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxnQkFBUyxDQUFDLEdBQUcsR0FBRyxVQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRTtRQUNsRCxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUN2QjtJQUVELHlCQUF5QjtJQUN6QixPQUFPLGdCQUFTLENBQUMsV0FBSSxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQy9DLENBQUM7QUEzQ0QsNEJBMkNDIn0=