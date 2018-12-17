import { StackTraceEnums } from '../enums';
import { getStackPath } from './utils';
import { readFileSync, existsSync } from 'fs'

/**
 * @class StackTrace
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

const stacks: MapStackTraces = new Map();

export class StackTrace {
    public stack: string;
    public filePath: string;
    public codeRow: number;
    public codeColumn: number;
    public file: string;
    public message: string;
    constructor(message: string = '') {
        this.message = message;
        StackTrace.render(this)
    }
    public setStackTraceInfo(type: StackTraceEnums.DECORATOR, target: Object, propertKey: string = 'default') {
       const data = StackTrace.get(type, target, propertKey)
       if (data) {
           Object.keys(data).forEach((key: keyof StackTraceInfo) => {
               this[key] = data[key]
           })
       }
       StackTrace.render(this)
    }
    public getCode(regexp: RegExp) {
        if (!this.file) return;
        const match = this.file.split('\n').splice(this.codeRow).join('\n').match(regexp)
        if (match) return match[0]
        return;
    }
    public replace(searchValue: string | RegExp, replaceValue: string) {
        this.file = this.file.replace(searchValue, replaceValue)
        StackTrace.render(this)
    }
    public resetCodeTarget(value: string) {
        const [before] = this.file.split(value)
        const split = before.split('\n')
        this.codeRow = split.length
        this.codeColumn = split.pop().length + 1
        StackTrace.render(this)
    }
    static render(stackTrace: StackTrace) {
        const { message, filePath, codeRow, codeColumn, file = '' } = stackTrace
        stackTrace.stack = `Error: ${message}\n`
        stackTrace.stack += `    at file: ${filePath}:${codeRow}:${codeColumn}\n`
        stackTrace.stack += `    at code:\n`
        stackTrace.stack += `${file.split('\n').map((value, index) => {
            const lineIndex = index + 1
            const line = file.split('\n').length.toString().replace(/[0-9]/g, ' ').split('');
            const lineNumber = lineIndex + line.splice(lineIndex.toString().length).join('')
            return `    ${lineNumber}    ${value}`
        }).join('\n')}`
    }
    static defineStackTrace(type: StackTraceEnums.DECORATOR, target: Object, propertKey: string = 'default') {
        if (typeof target !== 'function') throw new TypeError('Invalid Function')
        if (!stacks.has(target)) stacks.set(target, new Map())
        if (!stacks.get(target).has(type)) stacks.get(target).set(type, new Map())
        if (stacks.get(target).get(type).has(propertKey)) return;
        const trace: StackTraceInfo = {}
        Error.captureStackTrace(trace)
        const result = getStackPath(trace.stack)
        trace.filePath = result.filePath
        trace.codeRow = result.codeRow
        trace.codeColumn = result.codeColumn
        if (existsSync(result.filePath)) {
            trace.file = readFileSync(result.filePath, 'utf8').toString()
        }
        stacks.get(target).get(type).set(propertKey, trace)
    }
    static defineModule(target: Object, propertKey: string = 'default') {
        StackTrace.defineStackTrace(StackTraceEnums.DECORATOR.MODULE, target, propertKey)
    }
    static defineController(target: Object, propertKey: string = 'default') {
        StackTrace.defineStackTrace(StackTraceEnums.DECORATOR.CONTROLLER, target, propertKey)
    }
    static defineControllerMethod(target: Object, propertKey: string = 'default') {
        StackTrace.defineStackTrace(StackTraceEnums.DECORATOR.METHOD, target, propertKey)
    }
    static defineControllerParameter(target: Object, propertKey: string = 'default') {
        StackTrace.defineStackTrace(StackTraceEnums.DECORATOR.PARAMETER, target, propertKey)
    }
    static defineService(target: Object, propertKey: string = 'default') {
        StackTrace.defineStackTrace(StackTraceEnums.DECORATOR.SERVICE, target, propertKey)
    }
    static get(type: StackTraceEnums.DECORATOR, target: Object, propertKey: string = 'default') {
        if (!stacks.has(target)) return;
        if (!stacks.get(target).has(type)) return;
        if (!stacks.get(target).get(type).has(propertKey)) return;
        return stacks.get(target).get(type).get(propertKey)
    }
}

interface StackTraceInfo {
    stack?: string;
    filePath?: string;
    codeRow?: number;
    codeColumn?: number;
    file?: string;
    message?: string;
}

type MapTraces = Map<string, StackTraceInfo>;
type MapTraceTypes = Map<StackTraceEnums.DECORATOR, MapTraces>;
type MapStackTraces = Map<Object, MapTraceTypes>;