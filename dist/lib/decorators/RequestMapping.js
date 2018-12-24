"use strict";
/**
 * @module RequestMapping
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
require("reflect-metadata");
const StackTrace_1 = require("../StackTrace/StackTrace");
const chalk_1 = require("chalk");
const defalutMethod = enums_1.RequestEnums.METHOD.ALL;
/**
 * RequestMapping decorator
 *
 * The decorator apply to Contorllor or Contorllor propertys, Used to route.
 * Request method ALL (any)
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping('admin/:id')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping('admin/:id')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping(':id')
 * export class IndexController {}
 *
 * @Controller
 * @RequestMapping(':id/:name')
 * export class IndexController {}
 * ```
 */
function RequestMapping(path, method = defalutMethod) {
    return function decorator(...args) {
        const [target, propertyKey, descriptor] = args;
        if (args.length === 1) { // ClassDecorator
            StackTrace_1.StackTrace.defineController(target);
            Reflect.defineMetadata(enums_1.MetadataEnums.Controller.CONTROLLER, { path, method }, target);
        }
        else if (args.length === 3) { // MethodDecorator
            StackTrace_1.StackTrace.defineControllerMethod(target.constructor, propertyKey);
            const bodys = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST_BODY, target.constructor, propertyKey);
            const params = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST_PARAM, target.constructor, propertyKey);
            const files = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST_FILE, target.constructor, propertyKey);
            let requestName = `@${enums_1.RequestEnums.MAPPING[method]}`;
            if (path)
                requestName += `('${path}')`;
            if (/(GET|DELETE|HEAD|COPY|PURGE|UNLOCK)/.test(method)) {
                if (bodys) {
                    const error = new StackTrace_1.StackTrace(`Invalid decoraotr ${chalk_1.default.yellowBright(requestName)}, request method type is ${method}, cannot use ${chalk_1.default.yellowBright('@RequestBody')}.`);
                    error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey);
                    const originCode = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`));
                    const code = originCode
                        .replace(RegExp(`^${propertyKey}[\\s]*\\(`), '')
                        .replace(/\r\n/g, '')
                        .replace(/\)$/, '')
                        .split(',').map((value) => value.replace(/^[\s]*/, ''));
                    const value = chalk_1.default.redBright('@RequestBody');
                    const replaceValue = originCode.replace(code[bodys.index], code[bodys.index].replace('@RequestBody', value));
                    error.replace(originCode, replaceValue);
                    error.resetCodeTarget(value);
                    throw error;
                }
                if (files) {
                    const error = new StackTrace_1.StackTrace(`Invalid decoraotr ${chalk_1.default.yellowBright(requestName)}, request method type is ${method}, cannot use ${chalk_1.default.yellowBright('@RequestFile')}.`);
                    error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey);
                    const originCode = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`));
                    const code = originCode
                        .replace(RegExp(`^${propertyKey}[\\s]*\\(`), '')
                        .replace(/\r\n/g, '')
                        .replace(/\)$/, '')
                        .split(',').map((value) => value.replace(/^[\s]*/, ''));
                    const value = chalk_1.default.redBright('@RequestFile');
                    const replaceValue = originCode.replace(code[bodys.index], code[bodys.index].replace('@RequestFile', value));
                    error.replace(originCode, replaceValue);
                    error.resetCodeTarget(value);
                    throw error;
                }
            }
            if (params && !/\:/.test(path)) {
                const error = new StackTrace_1.StackTrace(`Invalid decoraotr ${chalk_1.default.yellowBright(requestName)}, request method path is not an dynamic route, cannot use ${chalk_1.default.yellowBright('@RequestParam')}.`);
                error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.PARAMETER, target.constructor, propertyKey);
                const originCode = error.getCode(RegExp(`${propertyKey}[\\s]*\\([\\r\\n\\s\\w\\@\\:\\,\\$\\(\\)\\{\\}\\'\\"\\[\\]]*\\)`));
                const code = originCode
                    .replace(RegExp(`^${propertyKey}[\\s]*\\(`), '')
                    .replace(/\r\n/g, '')
                    .replace(/\)$/, '')
                    .split(',').map((value) => value.replace(/^[\s]*/, ''));
                const value = chalk_1.default.redBright('@RequestParam');
                const replaceValue = originCode.replace(code[params.index], code[params.index].replace(/@RequestParam/, value));
                error.replace(originCode, replaceValue);
                error.resetCodeTarget(value);
                throw error;
            }
            if (path) {
                const pathSplit = path.split('/');
                pathSplit.forEach((key) => {
                    key = key.replace(':', '');
                    if (/[^\w]+/.test(key)) {
                        const error = new StackTrace_1.StackTrace(`Invalid decorator ${chalk_1.default.yellowBright(requestName)}, route path cannot use special characters.`);
                        error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.METHOD, target.constructor, propertyKey);
                        const originCode = error.getCode(RegExp(`@${enums_1.RequestEnums.MAPPING[method]}[\\s]*\\((\\'|\\")${path}(\\'|\\")\\)`));
                        const replaceValue = chalk_1.default.bgRedBright(key);
                        error.replace(originCode, originCode.replace(key, replaceValue));
                        error.resetCodeTarget(replaceValue);
                        throw error;
                    }
                });
            }
            const metadatas = Reflect.getMetadata(enums_1.MetadataEnums.Controller.REQUEST_MAPPING, target.constructor) || [];
            const repeat = metadatas.find((meta) => meta.path === path && meta.method === method);
            if (repeat) {
                const error = new StackTrace_1.StackTrace(`Invalid decorator ${chalk_1.default.yellowBright(requestName)}, route path cannot repeat.`);
                error.setStackTraceInfo(enums_1.StackTraceEnums.DECORATOR.METHOD, target.constructor, propertyKey);
                const originCode = error.getCode(RegExp(`@${enums_1.RequestEnums.MAPPING[method]}[\\s]*\\((\\'|\\")${path}(\\'|\\")\\)`));
                const replaceValue = chalk_1.default.bgRedBright(originCode);
                error.replace(originCode, replaceValue);
                error.resetCodeTarget(replaceValue);
                throw error;
            }
            if (!path)
                path = propertyKey;
            Reflect.defineMetadata(enums_1.MetadataEnums.Controller.REQUEST_MAPPING, [...metadatas, {
                    path,
                    method,
                    propertyKey
                }], target.constructor);
            return descriptor;
        }
    };
}
exports.RequestMapping = RequestMapping;
function GetMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.GET)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.GET);
    }
}
exports.GetMapping = GetMapping;
function PostMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.POST)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.POST);
    }
}
exports.PostMapping = PostMapping;
function DeleteMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.DELETE)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.DELETE);
    }
}
exports.DeleteMapping = DeleteMapping;
function CopyMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.COPY)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.COPY);
    }
}
exports.CopyMapping = CopyMapping;
function HeadMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.HEAD)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.HEAD);
    }
}
exports.HeadMapping = HeadMapping;
function LinkMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.LINK)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.LINK);
    }
}
exports.LinkMapping = LinkMapping;
function UnlinkMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.UNLINK)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.UNLINK);
    }
}
exports.UnlinkMapping = UnlinkMapping;
function OptionsMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.OPTIONS)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.OPTIONS);
    }
}
exports.OptionsMapping = OptionsMapping;
function PatchMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.PATCH)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.PATCH);
    }
}
exports.PatchMapping = PatchMapping;
function PropfindMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.PROPFIND)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.PROPFIND);
    }
}
exports.PropfindMapping = PropfindMapping;
function PurgeMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.PURGE)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.PURGE);
    }
}
exports.PurgeMapping = PurgeMapping;
function PutMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.PUT)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.PUT);
    }
}
exports.PutMapping = PutMapping;
function LockMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.LOCK)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.LOCK);
    }
}
exports.LockMapping = LockMapping;
function UnlockMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.UNLOCK)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.UNLOCK);
    }
}
exports.UnlockMapping = UnlockMapping;
function ViewMapping(...args) {
    if (args.length > 1) {
        const [target, propertyKey, descriptor] = args;
        return RequestMapping(null, enums_1.RequestEnums.METHOD.VIEW)(target, propertyKey, descriptor);
    }
    else {
        return RequestMapping(args[0], enums_1.RequestEnums.METHOD.VIEW);
    }
}
exports.ViewMapping = ViewMapping;
