/**
 * @class MetadataManager
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import 'reflect-metadata';
import { CType } from './decorators';
import { EasyBootServlet } from './core';
export declare class MetadataManager {
    application: EasyBootServlet;
    rootModule: CType;
    constructor(application: EasyBootServlet, rootModule: CType);
    modules: Map<CType, RegistedMoudle<any>>;
    /**
     * register
     * @param token
     * @param parentToken
     * @returns providers
     */
    register(token: CType, parentToken?: CType): void;
    /**
     * queryProviders
     * @param token
     * @param Service
     */
    queryProviders(token: CType, Service: CType): object;
    /**
     * reflectProviders
     * @param token
     * @returns providers
     */
    reflectProviders(token: CType): any;
    /**
     * reflectParamtypes
     * @param token
     */
    reflectParamtypes(token: CType): any;
    /**
     * reflectImports
     * @param token
     * @returns imports
     */
    reflectImports(token: CType): any;
    /**
     * reflectControllers
     * @param token
     * @returns controllers
     */
    reflectControllers(token: CType): any;
    /**
     * reflectExports
     * @param token
     * @returns exports
     */
    reflectExports(token: CType): any;
}
export interface RegistedMoudle<T> {
    imports?: Map<CType, object>;
    providers?: Map<CType, object>;
    exports?: Map<CType, object>;
}
