/**
 * @class SessionService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { Context } from '../Context';
import { SessionStore } from '../SessionStore';
import { EasyBootServlet } from '../EasyBootServlet';
import { SessionConfiguration } from '../../configurations';
export declare class SessionService {
    readonly Application: EasyBootServlet;
    readonly options: SessionConfiguration;
    readonly store: SessionStore;
    constructor(Application: EasyBootServlet, options: SessionConfiguration);
    get(context: Context): Promise<void>;
    set(context: Context): Promise<void>;
}
