/**
 * util send
 * @author ranyunlong<549510622@qq.com>
 * @license MIT
 */
import { ServletContext } from '../core/ServletContext';
import { StaticOptions } from '../services/ServletStaticService';
export default function (ctx: ServletContext, path: string, opts: StaticOptions): Promise<string>;
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
