"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const os_1 = require("os");
const first_mate_1 = require("first-mate");
const path_1 = require("path");
const chalk_1 = require("chalk");
const registry = new first_mate_1.GrammarRegistry();
const grammar = registry.loadGrammarSync(path_1.join(__dirname, '../', 'constants', 'typescript.tm.json'));
const filesRegisted = new Map();
const taces = new Map();
class DevStackTrace {
    constructor(message, targetToken) {
        this.message = message;
        this.targetToken = targetToken;
        this.tokenLines = [];
        Error.captureStackTrace(this);
        const { filePath, line, column } = this.getFilePath(this.stack);
        this.filePath = filePath;
        this.position = [line, column];
        switch (os_1.platform()) {
            case 'win32':
                this.lf = '\r\n';
            case 'darwin':
                this.lf = '\r';
            case 'linux':
                this.lf = '\n';
        }
        if (taces.has(this.filePath)) {
            const mapping = taces.get(this.filePath);
            if (mapping.has(targetToken.value)) {
                mapping.get(targetToken.value).push(this);
            }
            else {
                mapping.set(targetToken.value, [this]);
            }
        }
        else {
            const mapping = new Map();
            mapping.set(targetToken.value, [this]);
            taces.set(this.filePath, mapping);
        }
    }
    /**
     * throw Error
     */
    throw(target, end) {
        if (filesRegisted.has(this.filePath)) {
            this.file = filesRegisted.get(this.filePath);
        }
        else {
            this.file = fs_1.readFileSync(this.filePath, 'utf8');
            filesRegisted.set(this.filePath, this.file);
        }
        const fileSplit = this.file.split(this.lf);
        this.tokenLines = grammar.tokenizeLines(this.file).map((tokens, lineNum) => ({
            lineNum,
            line: fileSplit[lineNum],
            tokens
        }));
        let file;
        if (target && end) {
            file = this.formatFile(target, end);
        }
        else if (target) {
            file = this.formatFile(target);
        }
        else {
            file = this.formatFile();
        }
        this.stack = [
            `Error: ${this.message}`,
            `  at File: ${chalk_1.default.redBright(`${this.filePath}:${this.position.join(':')}`)}`,
            `  at Code:`,
            file
        ].join(this.lf);
        throw this;
    }
    /**
     * tokenizeLine
     */
    tokenizeLine(codeLine, lineNum) {
        const { line, tags } = grammar.tokenizeLine(codeLine);
        const tokens = registry.decodeTokens(line, tags);
        this.tokenLines.push({
            lineNum,
            tokens,
            line
        });
    }
    /**
     * format this file
     */
    formatFile(target, end) {
        const { targetToken } = this;
        const index = taces.get(this.filePath).get(targetToken.value).findIndex((tace) => tace === this);
        let codeIndex = -1;
        const count = this.tokenLines.length.toString().split('');
        let start;
        return this.tokenLines.map((tokenLine) => {
            let lineNum = (tokenLine.lineNum + 1).toString().split('');
            let err;
            let endLine;
            lineNum.unshift(...count.slice(lineNum.length).map((k) => ` `));
            const line = tokenLine.tokens.map((token) => {
                const result = targetToken.scopes.filter((targetScope) => token.scopes.find((tokenScope) => targetScope === tokenScope));
                if (result.length === targetToken.scopes.length && token.value === targetToken.value) {
                    codeIndex++;
                    if (index === codeIndex) {
                        err = true;
                        if (target)
                            start = true;
                        if (!target) {
                            this.position[0] = tokenLine.lineNum + 1;
                            this.position[1] = tokenLine.line.indexOf(token.value);
                        }
                        if (start)
                            return token.value;
                        return chalk_1.default.redBright(token.value);
                    }
                    else {
                        err = false;
                    }
                }
                if (start && target) {
                    const finds = target.scopes.filter((targetScope) => token.scopes.find((tokenScope) => targetScope === tokenScope));
                    if (token.value === target.value && finds.length === target.scopes.length) {
                        this.position[0] = tokenLine.lineNum + 1;
                        this.position[1] = tokenLine.line.indexOf(token.value) + 1;
                        return chalk_1.default.underline.redBright(token.value);
                    }
                    if (end) {
                        const endFinds = end.scopes.filter((targetScope) => token.scopes.find((tokenScope) => targetScope === tokenScope));
                        if (token.value === end.value && endFinds.length === end.scopes.length) {
                            start = false;
                            endLine = tokenLine.lineNum;
                        }
                    }
                }
                return token.value;
            });
            if (start && this.position[0] === tokenLine.lineNum + 1)
                return `  |${chalk_1.default.redBright(lineNum.join(''))}   ${line.join('')}`;
            if (err && !target)
                return `  |${chalk_1.default.redBright(lineNum.join('') + `   ${line.join('')}`)}`;
            return `  |${lineNum.join('')}   ${line.join('')}`;
        }).join(this.lf);
    }
    /**
     * get execption file path
     */
    getFilePath(stack) {
        const find = stack.split('\n').find((value) => /at __decorate/.test(value));
        if (!find)
            return;
        const matchPath = find.replace(/^\s*at\s*__decorate\s*\(/, '').replace(/\)/, '');
        if (os_1.platform() === 'win32') {
            const [disk, path, line, column] = matchPath.split(':');
            return {
                filePath: [disk, path].join(':'),
                line: Number(line),
                column: Number(column)
            };
        }
        const [filePath, line, column] = matchPath.split(':');
        return {
            filePath,
            line: Number(line),
            column: Number(column)
        };
    }
}
exports.DevStackTrace = DevStackTrace;
//# sourceMappingURL=DevStackTrace.js.map