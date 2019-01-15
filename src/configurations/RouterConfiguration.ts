/**
 * @class RouterConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export class RouterConfiguration {
    constructor(configuration?: RouterConfiguration) {
        if (typeof configuration !== 'object' && Array.isArray(configuration)) return;
        Object.keys(configuration).forEach((key: keyof RouterConfiguration) => {
            this[key] = configuration[key]
        })
    }

    /**
     * When `true` the regexp will be case sensitive. (default: `false`)
     */
    public sensitive: boolean = false;

    /**
     * When `true` the regexp allows an optional trailing delimiter to match. (default: `false`)
     */
    public strict: boolean = false;

    /**
     * When `true` the regexp will match to the end of the string. (default: `true`)
     */
    public end: boolean = true;

    /**
     * When `true` the regexp will match from the beginning of the string. (default: `true`)
     */
    public start: boolean = true;

    /**
     * Sets the final character for non-ending optimistic matches. (default: `/`)
     */
    public delimiter: string = '/';

    /**
     * List of characters that can also be "end" characters.
     */
    public endsWith?: string | string[];
}