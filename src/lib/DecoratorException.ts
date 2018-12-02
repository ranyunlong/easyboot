/**
 * @class Exception
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import chalk from 'chalk'
import * as fs from 'fs'

 export class DecoratorException extends Error {
    constructor(message: string, code: string = '') {
        super(message)
        let stack = this.stack.split('\n')
        this.stack = this.name + ': ' + this.message + '\n'
        const path = stack.find((k) => /^[\s]{4}at __decorate/.test(k)).replace(/^[\s]{4}at __decorate \(/, '').replace('\)', '')
        const [root, p, row, col] = path.split(':')
        this.stack += `    at ${[root, p, Number(row) + 1, col].join(':')}`
        let file = fs.readFileSync([root, p].join(':'))
            .toString()
            .split('\n');
        file = file.concat(file.splice(Number(row)).join('\n').replace(code, chalk.redBright(code)).split('\n'))
        file = file.map((k) => k = `    ${k}`)

        this.stack = this.stack + '\n\n' + file.join('\n')
    }
 }