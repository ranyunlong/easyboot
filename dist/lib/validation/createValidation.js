"use strict";
/**
 * @module createValidation
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Validation_1 = require("./Validation");
function createValidation(message, validator, ...args) {
    return new Validation_1.Validation(message, validator, ...args);
}
exports.createValidation = createValidation;
