import { GrammarToken } from 'first-mate';
declare type FilePath = string;
export declare class DevStackTrace {
    message: string;
    targetToken: GrammarToken;
    stack: string;
    position: [number, number];
    filePath: FilePath;
    file: string;
    stackIndex: number;
    tokenLines: StackToken[];
    private lf;
    constructor(message: string, targetToken: GrammarToken);
    /**
     * throw Error
     */
    throw(target?: GrammarToken, end?: GrammarToken): void;
    /**
     * tokenizeLine
     */
    private tokenizeLine;
    /**
     * format this file
     */
    private formatFile;
    /**
     * get execption file path
     */
    private getFilePath;
}
interface StackToken {
    lineNum: number;
    tokens: GrammarToken[];
    line?: string;
}
export {};
