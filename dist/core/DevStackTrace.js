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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGV2U3RhY2tUcmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlL0RldlN0YWNrVHJhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQkFBaUM7QUFDakMsMkJBQTZCO0FBQzdCLDJDQUEwRDtBQUMxRCwrQkFBNEI7QUFDNUIsaUNBQXlCO0FBRXpCLE1BQU0sUUFBUSxHQUFHLElBQUksNEJBQWUsRUFBRSxDQUFDO0FBQ3ZDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQTtBQUtuRyxNQUFNLGFBQWEsR0FBMEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN2RCxNQUFNLEtBQUssR0FBdUQsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUU1RSxNQUFhLGFBQWE7SUFRdEIsWUFBbUIsT0FBZSxFQUFTLFdBQXlCO1FBQWpELFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQUY3RCxlQUFVLEdBQWlCLEVBQUUsQ0FBQztRQUdqQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0IsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUvQixRQUFRLGFBQVEsRUFBRSxFQUFFO1lBQ2hCLEtBQUssT0FBTztnQkFDWixJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQTtZQUNoQixLQUFLLFFBQVE7Z0JBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENB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