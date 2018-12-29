/**
 * @class EasyBootEntity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { ArgumentMetadata } from './ArgumentMetadata';

export class EasyBootEntity {
    public transform?<V = any>(value: V, metadata?: ArgumentMetadata): V;
}