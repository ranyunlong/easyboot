"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const child_process_1 = require("child_process");
const chalk_1 = require("chalk");
exports.default = (type, value) => {
    if (process.platform === 'win32')
        type += '.cmd';
    const npmi = child_process_1.spawn(type, ['install'], {
        cwd: path.resolve(value),
        stdio: 'inherit',
        env: process.env
    });
    npmi.on('close', () => {
        console.log('\nTo get started:\n');
        console.log(chalk_1.default.yellow(`cd ${value}`));
        console.log(chalk_1.default.yellow(`${type.replace('.cmd', '')} start`));
        console.log(chalk_1.default.yellow(`docs in ${chalk_1.default.green(`https://github.com/ranyunlong/easyboot`)}`));
    });
};
