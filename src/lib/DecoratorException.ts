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
        this.stack += `    ${chalk.bold.yellowBright('ErrorFile')}:    ${[root, p, Number(row) + 1, col].join(':')}`
        let file = fs.readFileSync([root, p].join(':'))
            .toString()
            .split('\n');
        file = file.concat(file.splice(Number(row)).join('\n').replace(code, chalk.underline.bgRed(code)).split('\n'))
        file = file.map((k, i) => {
            let len = i.toString().length
            let fLen = file.length.toString().split('').map((k) => ' ')
            fLen.splice(0, len)
            // if (!/^\//.test(k)) {
            //     k = k.replace(/import/g, `${chalk.rgb(187, 134, 192)('import')}`)
            //     .replace(/from/g, `${chalk.rgb(187, 134, 192)('from')}`)
            //     .replace(/export/g, `${chalk.rgb(187, 134, 192)('export')}`)
            //     .replace(/return/g, `${chalk.rgb(187, 134, 192)('return')}`)
            //     .replace(/class/g, `${chalk.rgb(86, 156, 214)('class')}`)
            //     .replace(/constructor/g, `${chalk.rgb(86, 156, 214)('constructor')}`)
            //     .replace(/public/g, `${chalk.rgb(86, 156, 214)('public')}`)
            //     .replace(/async/g, `${chalk.rgb(86, 156, 214)('async')}`)
            //     .replace(/function/g, `${chalk.rgb(86, 156, 214)('function')}`)
            // }
            let match = /@[A-z_0-9]+/.exec(k)
            if (match) {
                // k = k.replace(RegExp(match[0].replace('@', ''), 'g'), chalk.yellowBright(match[0].replace('@', '')))
            }
            return '    ' + i +  fLen.join('') + '    ' + k
        })

        this.stack = this.stack + `\n    ${chalk.bold.yellowBright('ErrorCode')}:\n` + file.join('\n')
    }
 }