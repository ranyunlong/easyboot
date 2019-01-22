/**
 * @class ServletBodyParseService
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { ServletService } from '../core/ServletService';
import { ServiceMetadata } from '../core/ServiceMetadata';
import { ServletContext } from '../core/ServletContext';
export declare class ServletBodyParseService extends ServletService {
    strict: boolean;
    limit: Limit;
    opts: Options;
    constructor(strict?: boolean, limit?: Limit, opts?: Options);
    onLaunch(metadata: ServiceMetadata): Promise<null | undefined | object>;
    parse(context: ServletContext): Promise<object>;
}
interface Limit {
    /**
     * The byte (if integer) limit of the JSON body, default 1mb
     */
    json?: string;
    /**
     * The byte (if integer) limit of the form body, default 56kb
     */
    form?: string;
    /**
     * The byte (if integer) limit of the text body, default 56kb
     */
    text?: string;
}
interface Options {
    /**
     * Parse json bodies, default true
     */
    isParseJson?: boolean;
    /**
     * Parse text bodies, default true
     */
    isParseText?: boolean;
    /**
     * Parse urlencoded bodies, default true
     */
    isParseUrlencoded?: boolean;
}
export {};
