import * as fs from 'fs'
import chalk from 'chalk'
import { platform } from 'os'
export class DecoratorException extends Error {
    private filePath: string;
    private file: string;
    private row: number;
    private col: number;
    private _message: string;
    private _before: string[] = [];
    private _after: string[] = [];
    constructor(message: string = '', errorCode: string = '') {
        super(message)
        this.name = 'DecoratorException'
        this.getFilePath()
        this.readFile()
        if (errorCode) {
            this.highlight(errorCode)
        }
        this.render()
    }

    public append(val: string) {
        this._after.push(`    ${val}`)
    }

    public prepend(val: string) {
        this._before.push(`    ${val}`)
    }

    public highlight(code: string) {
        const replaceCode = chalk.underline.redBright(code)
        const fileSplit = this.file.split('\n')
        const splice = fileSplit.splice(this.row)
        this.file = fileSplit.join('\n') + '\n' + splice.join('\n').replace(code, replaceCode)
        const find = this.file.indexOf(replaceCode)
        if (!!~find) {
            const split = this.file.substr(0, find).split('\n')
            this.row = split.length
            this.col = split[split.length - 1].length  + 1
        }
        this.render()
    }

    public setMessage(val: string) {
        this.message = val
        this.render()
    }

    public getTarget() {
        return `${this.filePath}:${this.row}:${this.col}`
    }

    private getFilePath() {
        const stack = this.stack.split('\n')
        const target = stack.find((value) => /__decorate/.test(value))
        if (target) {
            const targetPath = target.replace(/(at\s__decorate|\(|\)|\s)/g, '').split(':')
            if (platform() === 'win32') {
                const [ pan, path, row, col ] = targetPath
                this.filePath = [pan, path].join(':')
                this.row = Number(row)
                this.col = Number(col)
            } else {
                const [ path, row, col ] = targetPath
                this.filePath = path
                this.row = Number(row)
                this.col = Number(col)
            }
        }
    }

    private readFile() {
        if (fs.existsSync(this.filePath)) {
            this.file = fs.readFileSync(this.filePath).toString() || ''
        }
    }

    private formatFile() {
        const fileSplit = this.file.split('\n')
        return fileSplit.map((value, index) => {
            let long = fileSplit.length.toString().split('')
            long.splice(0, (index + 1).toString().length)
            return `    ${index + 1}` + long.map(() => ' ').join('') + `    ${value}`
        }).join('\n')
    }

    private render() {
    this.stack = `${this.name}: ${this.message}
    at file: ${this.filePath}:${this.row}:${this.col}${this._before.length > 0 ? '\r\n' + this._before.join('\r\n') : ''}
    at code:\n${this.formatFile()}${this._after.length > 0 ? '\r\n\r\n' + this._after.join('\r\n') : ''}
    `
    }
}