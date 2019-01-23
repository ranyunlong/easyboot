#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const path = require("path");
const chalk_1 = require("chalk");
const child_process_1 = require("child_process");
const ora = require("ora");
const inquirer = require("inquirer");
const download_1 = require("./download");
const install_1 = require("./install");
const semver = require("semver");
const validatePackageName = require("validate-npm-package-name");
const whoami = require("whoami");
const fs_1 = require("fs");
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
};
const VERSION = require('../package').version;
let isAction;
program.version(VERSION, '-v, --version');
program
    .command('init <project>')
    .description('generate a new project from a template')
    .action(async (value) => {
    isAction = true;
    const spinner = ora('Loading download template').start();
    await download_1.default('ranyunlong/easyboot', path.resolve(value)).catch((err) => {
        spinner.fail('Template download failed!');
        console.log(err);
        process.exit();
    });
    spinner.succeed('Temlate download succeed!');
    const addName = async () => {
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: `Project name:`,
            default: path.basename(path.resolve())
        });
        const { errors } = validatePackageName(name);
        if (Array.isArray(errors)) {
            errors.forEach((error) => {
                console.log(error);
            });
            await addName();
        }
        packageTpl.name = name;
    };
    const addVersion = async () => {
        const { version } = await inquirer.prompt({
            type: 'input',
            name: 'version',
            message: `Version:`,
            default: '1.0.0'
        });
        if (!semver.valid(version)) {
            console.log(`Invalid version: '${version}'`);
            await addVersion();
            return;
        }
        packageTpl.version = version;
    };
    await addName();
    await addVersion();
    const { description } = await inquirer.prompt({
        type: 'input',
        name: 'description',
        message: `Description:`
    });
    packageTpl.description = description;
    const { main } = await inquirer.prompt({
        type: 'input',
        name: 'main',
        message: `Entry point:`,
        default: './dist/index.js'
    });
    packageTpl.main = main;
    const { keywords } = await inquirer.prompt({
        type: 'input',
        name: 'keywords',
        message: `Keywords:`
    });
    packageTpl.keywords = keywords;
    const { license } = await inquirer.prompt({
        type: 'input',
        name: 'license',
        message: `License:`,
        default: 'MIT'
    });
    packageTpl.license = license;
    const { author } = await inquirer.prompt({
        type: 'input',
        name: 'author',
        message: `Author`,
        default: whoami
    });
    packageTpl.author = author;
    const { isOk } = await inquirer.prompt({
        type: 'confirm',
        name: 'isOk',
        message: 'Is ok',
        default: true
    });
    if (!isOk) {
        process.exit();
    }
    fs_1.writeFileSync(path.resolve(value, 'package.json'), JSON.stringify(packageTpl, null, 4));
    const { isInstall } = await inquirer.prompt({
        type: 'confirm',
        name: 'isInstall',
        message: 'Do you need to install dependencies?',
        default: true
    });
    if (isInstall) {
        const { select } = await inquirer.prompt({
            type: 'list',
            message: 'Choose what way to install?',
            choices: ['use yarn install', 'use npm install', 'No, I will handle that myself'],
            default: 0,
            name: 'select'
        });
        if (select === 'use npm install') {
            install_1.default('npm', value);
        }
        else if (select === 'use yarn install') {
            install_1.default('yarn', value);
        }
        else {
            console.log('\nTo get started:\n');
            console.log(chalk_1.default.yellow(`cd ${value}`));
            console.log(chalk_1.default.yellow(`npm install`));
            console.log(chalk_1.default.yellow(`npm start`));
            console.log(chalk_1.default.yellow(`docs in ${chalk_1.default.green(`https://github.com/ranyunlong/easyboot`)}`));
        }
    }
});
program
    .command('dev <tsconfig-path> <entry-file-path>')
    .action((confitPath, entryFilePath) => {
    isAction = true;
    const child = child_process_1.fork(path.resolve('node_modules', 'ts-node-dev', 'bin', 'ts-node-dev'), ['--project', confitPath, entryFilePath], {
        cwd: path.resolve()
    });
    child.on('error', (err) => {
        if (err) {
            console.log(err);
            process.exit();
        }
    });
});
program
    .command('start <tsconfig-path> <entry-file-path>')
    .action((confitPath, entryFilePath) => {
    isAction = true;
    const child = child_process_1.fork(path.resolve('node_modules', 'ts-node', 'dist', 'bin'), ['--project', confitPath, entryFilePath], {
        cwd: path.resolve()
    });
    child.on('error', (err) => {
        if (err) {
            console.log(err);
            process.exit();
        }
    });
});
program.parse(process.argv);
if (!process.argv.slice(2).length || !isAction) {
    program.outputHelp((cb) => {
        return chalk_1.default.green(cb);
    });
}
