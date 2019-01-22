/**
 * @module RquestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { MetadataFile } from '../core/ServiceMetadata';
/**
 * Upload decorator
 *
 * The decorator apply to Contorllor propertys, use to set response status message.
 *
 * Example
 * ```
 * @Controller
 * @RequestMapping('admin')
 * export class IndexController {
 *     @GetMapping
 *     public async index(){}
 *
 *     @Upload
 *     public async test(@RequestBody('upic') file: File){}
 *
 *     @Upload({ encoding: 'utf-8', maxFileSize: 2 * 1024 * 1024, fileType: 'jpg'})
 *     public async test1(@RequestBody({'upic', IsFile}) file: any){}
 *
 *     @Upload({ encoding: 'utf-8', maxFileSize: 2 * 1024 * 1024, fileType: ['jpg', 'png', 'gif']})
 *     public async test1(@RequestBody file: FileEntity){}
 * }
 * ```
 */
export declare function Upload(options: MetadataFile): MethodDecorator;
export declare function Upload<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
