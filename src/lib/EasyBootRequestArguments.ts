/**
 * @class EasyBootRequestArguments
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { RuleItem } from './EasyBootValidators/baseValidator'
import { TClass } from './Module';

export class EasyBootRequestArguments {
    constructor(options: Options = {}) {
        this.key = options.key
        this.rule = options.rule
        this.type = options.type
    }
    public readonly type: 'body' | 'query' | 'param';
    public readonly rule: RuleItem;
    public readonly key: string;
}

interface Options {
    type?: 'body' | 'query' | 'param';
    rule?: RuleItem | null;
    key?: string;
}