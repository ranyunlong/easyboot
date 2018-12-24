/**
 * @class StaticService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Context } from '../Context';
import { StaticConfiguration } from '../../configurations';
export declare class StaticService {
    options: StaticConfiguration;
    constructor(options: StaticConfiguration);
    handleResponse(ctx: Context): Promise<void>;
    handleResponseDefer(ctx: Context): Promise<void>;
}
