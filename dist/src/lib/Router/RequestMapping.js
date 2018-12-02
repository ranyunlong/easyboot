"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
const ElementType_1 = require("./ElementType");
const assert = require("assert");
/**
 * @method RequestMapping
 * @param path
 * @param method
 * @author ranyunlong<549510622@qq.com>
 */
function RequestMapping(path, method = ElementType_1.ElementType.METHOD.ALL) {
    function decorator(...args) {
        const [target, propertyKey, descriptor] = args;
        if (args.length === 1) {
            const options = target.prototype;
            options.$route = path;
            options.$method = method;
        }
        else {
            const propertys = target.$propertys || new Map();
            if (propertys.has(propertyKey)) {
                const property = propertys.get(propertyKey);
                const routes = property.routes || new Map();
                const methodName = method.split('');
                const [first, ...more] = methodName;
                assert(!routes.has(method), `Invalid decorator: ^@${first + more.join('').toLowerCase()}Mapping('${path}').`);
                routes.set(method, {
                    path,
                    method,
                    propertyKey
                });
                property.routes = routes;
            }
            else {
                const routes = new Map();
                routes.set(method, {
                    path,
                    method,
                    propertyKey
                });
                propertys.set(propertyKey, {
                    routes
                });
            }
            target.$propertys = propertys;
        }
    }
    return decorator;
}
exports.RequestMapping = RequestMapping;
/**
 * @method GetMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function GetMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.GET);
}
exports.GetMapping = GetMapping;
/**
 * @method PostMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function PostMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.POST);
}
exports.PostMapping = PostMapping;
/**
 * @method DeleteMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function DeleteMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.DELETE);
}
exports.DeleteMapping = DeleteMapping;
/**
 * @method CopyMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function CopyMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.COPY);
}
exports.CopyMapping = CopyMapping;
/**
 * @method HeadMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function HeadMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.HEAD);
}
exports.HeadMapping = HeadMapping;
/**
 * @method LinkMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function LinkMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.LINK);
}
exports.LinkMapping = LinkMapping;
/**
 * @method LinkMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function UnlinkMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.UNLINK);
}
exports.UnlinkMapping = UnlinkMapping;
/**
 * @method OptionsMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function OptionsMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.OPTIONS);
}
exports.OptionsMapping = OptionsMapping;
/**
 * @method PatchMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function PatchMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.PATCH);
}
exports.PatchMapping = PatchMapping;
/**
 * @method PropfindMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function PropfindMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.PROPFIND);
}
exports.PropfindMapping = PropfindMapping;
/**
 * @method PurgeMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function PurgeMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.PURGE);
}
exports.PurgeMapping = PurgeMapping;
/**
 * @method PutMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function PutMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.PUT);
}
exports.PutMapping = PutMapping;
/**
 * @method LockMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function LockMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.LOCK);
}
exports.LockMapping = LockMapping;
/**
 * @method UnlockMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function UnlockMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.UNLOCK);
}
exports.UnlockMapping = UnlockMapping;
/**
 * @method ViewMapping
 * @param path
 * @author ranyunlong<549510622@qq.com>
 */
function ViewMapping(path) {
    return RequestMapping(path, ElementType_1.ElementType.METHOD.VIEW);
}
exports.ViewMapping = ViewMapping;
//# sourceMappingURL=RequestMapping.js.map