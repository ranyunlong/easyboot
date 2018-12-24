/**
 * @class StackTrace
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { StackTraceEnums } from '../enums';
export declare class StackTrace {
    stack: string;
    filePath: string;
    codeRow: number;
    codeColumn: number;
    file: string;
    message: string;
    constructor(message?: string);
    setStackTraceInfo(type: StackTraceEnums.DECORATOR, target: Object, propertKey?: string): void;
    getCode(regexp: RegExp): string;
    replace(searchValue: string | RegExp, replaceValue: string): void;
    resetCodeTarget(value: string): void;
    static render(stackTrace: StackTrace): void;
    static defineStackTrace(type: StackTraceEnums.DECORATOR, target: Object, propertKey?: string): void;
    static defineModule(target: Object, propertKey?: string): void;
    static defineController(target: Object, propertKey?: string): void;
    static defineControllerMethod(target: Object, propertKey?: string): void;
    static defineControllerParameter(target: Object, propertKey?: string): void;
    static defineService(target: Object, propertKey?: string): void;
    static get(type: StackTraceEnums.DECORATOR, target: Object, propertKey?: string): StackTraceInfo;
}
interface StackTraceInfo {
    stack?: string;
    filePath?: string;
    codeRow?: number;
    codeColumn?: number;
    file?: string;
    message?: string;
}
export {};
