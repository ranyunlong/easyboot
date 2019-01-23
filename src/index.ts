#!/usr/bin/env node

import * as program from 'commander'
import * as path from 'path'
import chalk from 'chalk'
import { spawn, fork } from 'child_process'
import * as ora from 'ora'
import * as inquirer from 'inquirer'
import download from './download'
import install from './install'
import * as semver from 'semver'
import validatePackageName = require('validate-npm-package-name')
import whoami = require('whoami')
import { writeFileSync } from 'fs'

const packageTpl = {
    name: '',
    version: '1.0.0',
    main: '',
    license: 'MIT',
    description: '',
    scripts: {
        dev: 'easyboot dev ./tsconfig.json ./src/index.ts',
        start: 'easyboot start ./tsconfig.json ./src/index.ts'
    },
    keywords: '',
    author: '',
    dependencies: {
        '@easyboot/core': '^1.0.1'
    }
}

const VERSION = require('../package').version
let isAction: boolean;
program.version(VERSION, '-v, --version')

program
    .command('init <project>')
    .description('generate a new project from a template')
    .action(async (value: string) => {
        isAction = true
        const spinner = ora('Loading download template').start();
        await download('ranyunlong/easyboot', path.resolve(value)).catch((err) => {
            spinner.fail('Template download failed!')
            console.log(err)
            process.exit()
        })

        spinner.succeed('Temlate download succeed!')

        const addName = async () => {
            const { name } = await inquirer.prompt<{ name: string }>({
                type: 'input',
                name: 'name',
                message: `Project name:`,
                default: path.basename(path.resolve())
            })
            const { errors } = validatePackageName(name)
            if (Array.isArray(errors)) {
                errors.forEach((error) => {
                    console.log(error)
                })
                await addName()
            }
            packageTpl.name = name
        }

        const addVersion = async () => {
            const { version } = await inquirer.prompt<{ version: string }>({
                type: 'input',
                name: 'version',
                message: `Version:`,
                default: '1.0.0'
            })

            if (!semver.valid(version)) {
                console.log(`Invalid version: '${version}'`)
                await addVersion()
                return;
            }
            packageTpl.version = version
        }

        await addName()
        await addVersion()

        const { description } = await inquirer.prompt<{ description: string }>({
            type: 'input',
            name: 'description',
            message: `Description:`
        })
        packageTpl.description = description

        const { main } = await inquirer.prompt<{ main: string }>({
            type: 'input',
            name: 'main',
            message: `Entry point:`,
            default: './dist/index.js'
        })
        packageTpl.main = main

        const { keywords } = await inquirer.prompt<{ keywords: string }>({
            type: 'input',
            name: 'keywords',
            message: `Keywords:`
        })
        packageTpl.keywords = keywords

        const { license } = await inquirer.prompt<{ license: string }>({
            type: 'input',
            name: 'license',
            message: `License:`,
            default: 'MIT'
        })
        packageTpl.license = license

        const { author } = await inquirer.prompt<{ author: string }>({
            type: 'input',
            name: 'author',
            message: `Author`,
            default: whoami
        })
        packageTpl.author = author

        const { isOk } = await inquirer.prompt<{isOk: boolean}>({
            type: 'confirm',
            name: 'isOk',
            message: 'Is ok',
            default: true
        })

        if (!isOk) {
            process.exit()
        }

        writeFileSync(path.resolve(value, 'package.json'), JSON.stringify(packageTpl, null, 4))

        const { isInstall } = await inquirer.prompt<{isInstall: boolean}>({
            type: 'confirm',
            name: 'isInstall',
            message: 'Do you need to install dependencies?',
            default: true
        })

        if (isInstall) {
            const { select } = await inquirer.prompt<{ select: 'use yarn install' | 'use npm install' }>({
                type: 'list',
                message: 'Choose what way to install?',
                choices: ['use yarn install', 'use npm install', 'No, I will handle that myself'],
                default: 0,
                name: 'select'
            })

            if (select === 'use npm install') {
                install('npm', value)
            } else if (select === 'use yarn install') {
                install('yarn', value)
            } else {
                console.log('\nTo get started:\n')
                console.log(chalk.yellow(`cd ${value}`))
                console.log(chalk.yellow(`npm install`))
                console.log(chalk.yellow(`npm start`))
                console.log(chalk.yellow(`docs in ${chalk.green(`https://github.com/ranyunlong/easyboot`)}`))
            }
        }
    })

program
    .command('dev <tsconfig-path> <entry-file-path>')
    .action((confitPath: string, entryFilePath: string) => {
        isAction = true
        const child = fork(path.resolve('node_modules', 'ts-node-dev', 'bin', 'ts-node-dev'), ['--project', confitPath, entryFilePath], {
            cwd: path.resolve()
        })

        child.on('error', (err) => {
            if (err) {
                console.log(err)
                process.exit()
            }
        })
    })

program
    .command('start <tsconfig-path> <entry-file-path>')
    .action((confitPath: string, entryFilePath: string) => {
        isAction = true
        const child = fork(path.resolve('node_modules', 'ts-node', 'dist', 'bin'), ['--project', confitPath, entryFilePath], {
            cwd: path.resolve()
        })

        child.on('error', (err) => {
            if (err) {
                console.log(err)
                process.exit()
            }
        })
    })

program.parse(process.argv)

if (!process.argv.slice(2).length || !isAction) {
    program.outputHelp((cb: string) => {
        return chalk.green(cb)
    });
}