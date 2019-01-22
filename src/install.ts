import * as path from 'path'
import { spawn } from 'child_process'
import chalk from 'chalk'

export default(type: string, value: string) => {
    if (process.platform === 'win32') type += '.cmd'
    const npmi = spawn(type, ['install'], {
        cwd: path.resolve(value),
        stdio: 'inherit',
        env: process.env
    })

    npmi.on('close', () => {
        console.log('\nTo get started:\n')
        console.log(chalk.yellow(`cd ${value}`))
        console.log(chalk.yellow(`${type.replace('.cmd', '')} start`))
        console.log(chalk.yellow(`docs in ${chalk.green(`https://github.com/ranyunlong/easyboot`)}`))
    })
}