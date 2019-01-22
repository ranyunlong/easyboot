/**
 * @class RouterConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export declare class RouterConfiguration {
    constructor(configuration?: RouterConfiguration);
    /**
     * When `true` the regexp will be case sensitive. (default: `false`)
     */
    sensitive: boolean;
    /**
     * When `true` the regexp allows an optional trailing delimiter to match. (default: `false`)
     */
    strict: boolean;
    /**
     * When `true` the regexp will match to the end of the string. (default: `true`)
     */
    end: boolean;
    /**
     * When `true` the regexp will match from the beginning of the string. (default: `true`)
     */
    start: boolean;
    /**
     * Sets the final character for non-ending optimistic matches. (default: `/`)
     */
    delimiter: string;
    /**
     * List of characters that can also be "end" characters.
     */
    endsWith?: string | string[];
}
