/**
 * @class BodyParserService
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 * @copyright Ranyunlong 2018-09-23 19:07
 */
import { Context } from '../Context';
import { UploadOptions } from '../../decorators';
import { BodyParseConfiguration, FormMidableConfiguration } from '../../configurations';
export declare class BodyParserService {
    opts: BodyParseConfiguration;
    /**
     * The byte (if integer) limit of the JSON body, default 1mb
     */
    readonly jsonLimit: string;
    /**
     * The byte (if integer) limit of the form body, default 56kb
     */
    readonly formLimit: string;
    /**
     * The byte (if integer) limit of the text body, default 56kb
     */
    readonly textLimit: string;
    /**
     * Sets encoding for incoming form fields, default utf-8
     */
    readonly encoding: 'utf-8' | string;
    /**
     * Parse multipart bodies, default false
     */
    readonly multipart: boolean;
    /**
     * Parse urlencoded bodies, default true
     */
    readonly urlencoded: boolean;
    /**
     * Parse text bodies, default true
     */
    readonly text: boolean;
    /**
     * Parse json bodies, default true
     */
    readonly json: boolean;
    /**
     * Toggles co-body strict mode; if set to true - only parses arrays or objects, default true
     */
    readonly jsonStrict: boolean;
    /**
     * Options to pass to the formidable multipart parser
     */
    readonly formidable: FormMidableConfiguration;
    /**
     * If enabled, don't parse GET, HEAD, DELETE requests, default true
     */
    readonly strict: boolean;
    /**
     * Sets the directory for placing file uploads in. You can move them later on using fs.rename(). The default is os.tmpdir().
     */
    readonly uploadDir: string;
    constructor(opts?: BodyParseConfiguration);
    /**
     * parseBody
     * Parser body request data
     */
    parseBody(ctx: Context): Promise<any>;
    /**
     * parseBody
     * Parser file request data
     */
    parseFile(ctx: Context, options?: UploadOptions): Promise<{
        [key: string]: any;
    } | undefined>;
}
