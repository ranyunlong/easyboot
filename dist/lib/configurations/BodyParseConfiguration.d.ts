/**
 * @class BodyParseConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { FormMidableConfiguration } from './FormMidableConfiguration';
export declare class BodyParseConfiguration {
    /**
     * The byte (if integer) limit of the JSON body, default 1mb
     */
    jsonLimit?: string;
    /**
     * The byte (if integer) limit of the form body, default 56kb
     */
    formLimit?: string;
    /**
     * The byte (if integer) limit of the text body, default 56kb
     */
    textLimit?: string;
    /**
     * Sets encoding for incoming form fields, default utf-8
     */
    encoding?: 'utf-8' | string;
    /**
     * Parse multipart bodies, default false
     */
    multipart?: boolean;
    /**
     * Parse urlencoded bodies, default true
     */
    urlencoded?: boolean;
    /**
     * Parse text bodies, default true
     */
    text?: boolean;
    /**
     * Parse json bodies, default true
     */
    json?: boolean;
    /**
     * Toggles co-body strict mode; if set to true - only parses arrays or objects, default true
     */
    jsonStrict?: boolean;
    /**
     * Options to pass to the formidable multipart parser
     */
    formidable?: FormMidableConfiguration;
    /**
     * If enabled, don't parse GET, HEAD, DELETE requests, default true
     */
    strict?: boolean;
    /**
     * Sets the directory for placing file uploads in. You can move them later on using fs.rename(). The default is os.tmpdir().
     */
    uploadDir?: string;
}
