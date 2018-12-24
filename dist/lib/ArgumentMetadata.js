"use strict";
/**
 * @class ArgumentMetadata
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ArgumentMetadata {
    constructor(type, metatype, validation, propertyKey) {
        this.type = type;
        this.metatype = metatype;
        this.validation = validation;
        this.propertyKey = propertyKey;
    }
}
exports.ArgumentMetadata = ArgumentMetadata;
