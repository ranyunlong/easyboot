/**
 * @module Configuration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { CType } from './Module';
import 'reflect-metadata';
/**
 * Configuration decorator
 *
 * The decorator apply EasyBootServlet application.
 *
 * Example
 * ```
 * @Configuration(ApplicationConfig)
 * export class Application extends EasyBootServlet {
 *    public async run(context: Context) {}
 * }
 * ```
 */
export declare function Configuration(metadata: CType): ClassDecorator;
