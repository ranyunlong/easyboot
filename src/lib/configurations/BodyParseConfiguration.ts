/**
 * @class BodyParseConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { tmpdir } from 'os'
import { FormMidableConfiguration } from './FormMidableConfiguration';
export class BodyParseConfiguration {
    /**
     * The byte (if integer) limit of the JSON body, default 1mb
     */
    public jsonLimit?: string = '1mb'

    /**
     * The byte (if integer) limit of the form body, default 56kb
     */
    public formLimit?: string = '56kb'

    /**
     * The byte (if integer) limit of the text body, default 56kb
     */
    public textLimit?: string = '56kb'

    /**
     * Sets encoding for incoming form fields, default utf-8
     */
    public encoding?: 'utf-8' | string = 'utf-8'

    /**
     * Parse multipart bodies, default false
     */
    public multipart?: boolean = false;

    /**
     * Parse urlencoded bodies, default true
     */
    public urlencoded?: boolean = true;

    /**
     * Parse text bodies, default true
     */
    public text?: boolean = true;

    /**
     * Parse json bodies, default true
     */
    public json?: boolean = true;

    /**
     * Toggles co-body strict mode; if set to true - only parses arrays or objects, default true
     */
    public jsonStrict?: boolean = true;

    /**
     * Options to pass to the formidable multipart parser
     */
    public formidable?: FormMidableConfiguration = new FormMidableConfiguration()

    /**
     * If enabled, don't parse GET, HEAD, DELETE requests, default true
     */
    public strict?: boolean = true;

    /**
     * Sets the directory for placing file uploads in. You can move them later on using fs.rename(). The default is os.tmpdir().
     */
    public uploadDir?: string = tmpdir();
}