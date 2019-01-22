/**
 * @module RquestQuery
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { CONTROLLER } from '../constants/metadata.constant';
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
export function Upload(options: MetadataFile): MethodDecorator;
export function Upload<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
export function Upload(...args: any[]): any {
    if (args.length === 1) {
        return <T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void => {
            Reflect.defineMetadata(CONTROLLER.REQUEST_FILE, args[0], target.constructor, propertyKey)
        }
    } else {
        const [ target, propertyKey, descriptor ] = args
        Reflect.defineMetadata(CONTROLLER.REQUEST_FILE, {}, target.constructor, propertyKey)
    }
}