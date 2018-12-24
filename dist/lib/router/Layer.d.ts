/**
 * @class Layer
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata';
import { Route } from './Route';
import { RequestEnums } from '../enums';
import { Key } from 'path-to-regexp';
import { CType } from '../decorators';
import { Context } from '../core/Context';
import { BodyParserService } from '../core/services/BodyParserService';
import { HttpException, HttpExceptionConstructor } from '../core';
export declare class Layer {
    readonly method: RequestEnums.METHOD;
    readonly path: string;
    readonly propertyKey: string;
    readonly pathParamsKeys: Key[];
    readonly regexp: RegExp;
    readonly Controller: CType;
    readonly Mod: CType;
    readonly handleMetadatas: any[];
    readonly statusCode: number;
    readonly statusMessage: string;
    readonly exceptionCapture: HttpExceptionConstructor;
    readonly exception: HttpException;
    readonly contentType: string;
    constructor(route: Route);
    parseParamMetadata(context: Context): Promise<void>;
    parseBodyMetadata(bodyParseService: BodyParserService, context: Context): Promise<void>;
    parseQueryMetadata(context: Context): Promise<void>;
    parseRequestMetadata(context: Context): Promise<void>;
    parseResponseMetadata(context: Context): Promise<void>;
    parseSessionMetadata(context: Context): Promise<void>;
}
