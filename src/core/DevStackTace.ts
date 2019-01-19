import { readFileSync } from 'fs'
import { platform } from 'os'
import { GrammarRegistry, GrammarToken } from 'first-mate'
import { join } from 'path';
import chalk from 'chalk'

const registry = new GrammarRegistry();
const grammar = registry.loadGrammarSync(join(__dirname, '../', 'constants', 'typescript.tm.json'))

type FilePath = string;
type DecoratorName = string;

const filesRegisted: Map<FilePath, string> = new Map();
const taces: Map<FilePath, Map<DecoratorName, DevStackTace[]>> = new Map();

export class DevStackTace {
    public stack: string;
    public position: [number, number];
    public filePath: FilePath;
    public file: string;
    public stackIndex: number;
    public tokenLines: StackToken[] = [];
    private lf: string;
    constructor(public message: string, public scope: string, public value: DecoratorName) {
        Error.captureStackTrace(this)
        const { filePath, line, column } = this.getFilePath(this.stack);
        this.filePath = filePath;
        this.position = [line, column];

        switch (platform()) {
            case 'win32':
            this.lf = '\r\n'
            case 'darwin':
            this.lf = '\r'
            case 'linux':
            this.lf = '\n'
        }

        if (taces.has(this.filePath)) {
            const mapping = taces.get(this.filePath)
            if (mapping.has(this.value)) {
                mapping.get(this.value).push(this)
            } else {
                mapping.set(this.value, [this])
            }
        } else {
            const mapping = new Map()
            mapping.set(this.value, [this])
            taces.set(this.filePath, mapping)
        }
    }

    /**
     * throw Error
     */
    public throw() {
        if (filesRegisted.has(this.filePath)) {
            this.file = filesRegisted.get(this.filePath)
        } else {
            this.file = readFileSync(this.filePath, 'utf8');
            filesRegisted.set(this.filePath, this.file);
        }
        const fileSplit = this.file.split(this.lf)
        this.tokenLines = grammar.tokenizeLines(this.file).map((tokens, lineNum) => ({
            lineNum,
            line: fileSplit[lineNum],
            tokens
        }))

        const file = this.formatFile()
        this.stack = [
            `Error: ${this.message}`,
            `  at File: ${chalk.redBright(`${this.filePath}:${this.position.join(':')}`)}`,
            `  at Code:`,
            file
        ].join(this.lf)
        throw this;
    }

    /**
     * tokenizeLine
     */
    private tokenizeLine(codeLine: string, lineNum: number) {
        const {line, tags} = grammar.tokenizeLine(codeLine)
        const tokens = registry.decodeTokens(line, tags)
        this.tokenLines.push({
            lineNum,
            tokens,
            line
        })
    }

    /**
     * format this file
     */
    private formatFile() {
        const index = taces.get(this.filePath).get(this.value).findIndex((tace) => tace === this)
        let codeIndex: number = -1;
        const count = this.tokenLines.length.toString().split('')
        return this.tokenLines.map((tokenLine) => {
            let lineNum = (tokenLine.lineNum + 1).toString().split('')
            let err: boolean;
            lineNum.unshift(...count.slice(lineNum.length).map((k) => ` `))
            const line = tokenLine.tokens.map((token) => {
                if (token.scopes.find((scope) => scope === this.scope) && token.value === this.value) {
                    codeIndex ++;
                    if (index === codeIndex) {
                        err = true
                        this.position[0] = tokenLine.lineNum + 1
                        this.position[1] = tokenLine.line.indexOf(token.value)
                        return chalk.underline(token.value)
                    } else {
                        err = false;
                    }
                }
                return token.value
            })
            if (err) {
                return `  |${chalk.redBright(lineNum.join('') + `   ${line.join('')}`)}`
            }
            return `  |${lineNum.join('')}   ${line.join('')}`
        }).join(this.lf)
    }

    /**
     * get execption file path
     */
    private getFilePath(stack: string) {
        const find = stack.split('\n').find((value) => /at __decorate/.test(value))
        if (!find) return;
        const matchPath = find.replace(/^\s*at\s*__decorate\s*\(/, '').replace(/\)/, '')
        if (platform() === 'win32') {
            const [ disk, path, line, column ] = matchPath.split(':')
            return {
                filePath: [disk, path].join(':'),
                line: Number(line),
                column: Number(column)
            }
        }
        const [ filePath, line, column ] = matchPath.split(':')
         return {
             filePath,
             line: Number(line),
             column: Number(column)
         }

    }
}

interface StackToken {
    lineNum: number;
    tokens: GrammarToken[];
    line?: string;
}