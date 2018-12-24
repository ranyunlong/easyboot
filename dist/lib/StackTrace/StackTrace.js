"use strict";
/**
 * @class StackTrace
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const utils_1 = require("./utils");
const fs_1 = require("fs");
const stacks = new Map();
class StackTrace {
    constructor(message = '') {
        this.message = message;
        StackTrace.render(this);
    }
    setStackTraceInfo(type, target, propertKey = 'default') {
        const data = StackTrace.get(type, target, propertKey);
        if (data) {
            Object.keys(data).forEach((key) => {
                this[key] = data[key];
            });
        }
        StackTrace.render(this);
    }
    getCode(regexp) {
        if (!this.file)
            return;
        const match = this.file.split('\n').splice(this.codeRow).join('\n').match(regexp);
        if (match)
            return match[0];
        return;
    }
    replace(searchValue, replaceValue) {
        this.file = this.file.replace(searchValue, replaceValue);
        StackTrace.render(this);
    }
    resetCodeTarget(value) {
        const [before] = this.file.split(value);
        const split = before.split('\n');
        this.codeRow = split.length;
        this.codeColumn = split.pop().length + 1;
        StackTrace.render(this);
    }
    static render(stackTrace) {
        const { message, filePath, codeRow, codeColumn, file = '' } = stackTrace;
        stackTrace.stack = `Error: ${message}\n`;
        stackTrace.stack += `    at file: ${filePath}:${codeRow}:${codeColumn}\n`;
        stackTrace.stack += `    at code:\n`;
        stackTrace.stack += `${file.split('\n').map((value, index) => {
            const lineIndex = index + 1;
            const line = file.split('\n').length.toString().replace(/[0-9]/g, ' ').split('');
            const lineNumber = lineIndex + line.splice(lineIndex.toString().length).join('');
            return `    ${lineNumber}    ${value}`;
        }).join('\n')}`;
    }
    static defineStackTrace(type, target, propertKey = 'default') {
        if (typeof target !== 'function')
            throw new TypeError('Invalid Function');
        if (!stacks.has(target))
            stacks.set(target, new Map());
        if (!stacks.get(target).has(type))
            stacks.get(target).set(type, new Map());
        if (stacks.get(target).get(type).has(propertKey))
            return;
        const trace = {};
        Error.captureStackTrace(trace);
        const result = utils_1.getStackPath(trace.stack);
        trace.filePath = result.filePath;
        trace.codeRow = result.codeRow;
        trace.codeColumn = result.codeColumn;
        if (fs_1.existsSync(result.filePath)) {
            trace.file = fs_1.readFileSync(result.filePath, 'utf8').toString();
        }
        stacks.get(target).get(type).set(propertKey, trace);
    }
    static defineModule(target, propertKey = 'default') {
        StackTrace.defineStackTrace(enums_1.StackTraceEnums.DECORATOR.MODULE, target, propertKey);
    }
    static defineController(target, propertKey = 'default') {
        StackTrace.defineStackTrace(enums_1.StackTraceEnums.DECORATOR.CONTROLLER, target, propertKey);
    }
    static defineControllerMethod(target, propertKey = 'default') {
        StackTrace.defineStackTrace(enums_1.StackTraceEnums.DECORATOR.METHOD, target, propertKey);
    }
    static defineControllerParameter(target, propertKey = 'default') {
        StackTrace.defineStackTrace(enums_1.StackTraceEnums.DECORATOR.PARAMETER, target, propertKey);
    }
    static defineService(target, propertKey = 'default') {
        StackTrace.defineStackTrace(enums_1.StackTraceEnums.DECORATOR.SERVICE, target, propertKey);
    }
    static get(type, target, propertKey = 'default') {
        if (!stacks.has(target))
            return;
        if (!stacks.get(target).has(type))
            return;
        if (!stacks.get(target).get(type).has(propertKey))
            return;
        return stacks.get(target).get(type).get(propertKey);
    }
}
exports.StackTrace = StackTrace;
