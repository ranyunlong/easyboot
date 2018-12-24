/**
 * @class Route
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata';
import { CType } from '../decorators';
import { RegExpOptions, Key } from 'path-to-regexp';
import { RequestEnums } from '../enums';
import { HttpExceptionConstructor, HttpException } from '../core';
export declare class Route {
    Controller: CType;
    Module: CType;
    options: RegExpOptions;
    basePath: string;
    baseMethod: string;
    path: string;
    method: RequestEnums.METHOD;
    propertyKey: string;
    pathParamsKeys: Key[];
    regexp: RegExp;
    routePath: string;
    statusMessage: string;
    statusCode: number;
    exceptionCapture: HttpExceptionConstructor;
    exception: HttpException;
    contentType: string;
    constructor(Controller: CType, Module: CType, options: RegExpOptions, metadata: {
        path: string;
        method: RequestEnums.METHOD;
        propertyKey: string;
    });
    protected mergePath(): void;
    protected createRegexp(): void;
}
