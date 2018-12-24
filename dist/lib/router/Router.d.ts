/**
 * @class Router
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata';
import { Route } from './Route';
import { CType } from '../decorators';
import { Context } from '../core/Context';
import { RegExpOptions } from 'path-to-regexp';
import EasyBootServlet from '../core/EasyBootServlet';
export declare class Router {
    application: EasyBootServlet;
    configs: RegExpOptions;
    routes: Route[];
    constructor(application: EasyBootServlet, configs: RegExpOptions);
    addRoute(Module: CType, Controller: CType): void;
    private matchRoute;
    handleResponse(context: Context): Promise<void>;
}
