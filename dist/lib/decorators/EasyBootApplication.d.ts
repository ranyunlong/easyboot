/**
 * @module EasyBootApplication
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { CType } from './Module';
import 'reflect-metadata';
/**
 * EasyBootApplication decorator
 *
 * The decorator apply to EasyBootApplication.
 *
 * Example
 * ```
 * @Configuration(ApplicationConfig)
 * @EasyBootApplication(RootModule)
 * export class Application extends EasyBootServlet {
 * }
 *
 * new Application()
 * ```
 */
export declare function EasyBootApplication(metadata: CType): ClassDecorator;
