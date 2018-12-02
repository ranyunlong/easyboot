/**
 * @class EasyBootRequestArguments
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
export class EasyBootRequestArguments {
    public readonly type: 'body' | 'query' | 'path';
    public readonly data: any;
}