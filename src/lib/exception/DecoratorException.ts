import * as fs from 'fs'
import chalk from 'chalk'
export class DecoratorException extends Error {
    public filePath: string;
    constructor(message: string, errorCode: string = '') {
        super(message)
        this.name = 'DecoratorException'
        this.getFilePath()
        this.render()
        // const stack = this.stack.split('\n')
        // const [ first, ...more ] = stack
        // const errFileTarget: any = more.find((value) => /__decorate/.test(value))

        // let fileSplit: string[] = []
        // if (errFileTarget) {
        //     const errFileSplit = errFileTarget.replace(/(at\s__decorate|\(|\)|\s)/g, '').split(':')
        //     let [ diskpath, filepath, row, col ] = errFileSplit
        //     this.filePath = [diskpath, filepath].join(':')
        //     const file = fs.readFileSync(this.filePath, 'utf8').toString()
        //     fileSplit = file.split('\n')
        //     const replaceCodes = fileSplit.splice(row).join('\n').replace(errorCode, chalk.underline.bgRedBright(errorCode))
        //     fileSplit.push(...replaceCodes.split('\n'))
        //     fileSplit = fileSplit.map((value, index) => {
        //         let long = fileSplit.length.toString().split('')
        //             long.splice(0, (index + 1).toString().length)
        //         return `    ${index + 1}` + long.map(() => ' ').join('') + `    ${value}`
        //     })
        //     const exec = RegExp(errorCode).exec(file)
        //     if (exec.index) {
        //         const str = file.substr(0, exec.index)
        //         const strSplit = str.split('\n')
        //         row = strSplit.length
        //         col = strSplit[strSplit.length - 1].length + 1
        //         this.filePath = [diskpath, filepath, row, col].join(':')
        //     }
        // }
        // this.stack = [first, `    at file: ${this.filePath}`, `    at code:`, ...fileSplit].join('\n')
    }

    getFilePath() {
        const stack = this.stack.split('\n')
        const target = stack.find((value) => /__decorate/.test(value))
        if (target) {
            const a = target.replace(/(at\s__decorate|\(|\)|\s)/g, '').split(':')
            console.log(a)
        }
    }

    render() {
        this.stack = `${this.name}: ${this.message}\n${this.filePath}`
    }
}