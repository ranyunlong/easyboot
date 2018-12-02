/**
 * @class EasyBootEntity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { EasyBootRequestArguments } from './EasyBootRequestArguments'
import { HttpException } from './HttpException';

export abstract class EasyBootEntity {
    public abstract transform(value: string, requestArgument: EasyBootRequestArguments): HttpException | any;
}

export interface EasyBootEntityConstructor {
    new (...args: any[]): EasyBootEntity;
}