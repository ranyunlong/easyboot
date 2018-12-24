/**
 * util send
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 */
import { Context } from '../core';
import { StaticConfiguration } from '../configurations';
export default function (ctx: Context, path: string, opts: StaticConfiguration): Promise<string>;
/**
 * File type.
 */
export declare function type(file: string, ext: string): string;
/**
 * Decode `path`.
 */
export declare function decode(path: string): string | -1;
/**
 *  Check if it's hidden.
 */
export declare function isHidden(root: string, path: string | string[]): boolean;
