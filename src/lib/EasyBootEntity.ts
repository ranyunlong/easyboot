/**
 * @class EasyBootEntity
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
import { EasyBootRequestArguments } from './EasyBootRequestArguments'
import { HttpException } from './HttpException';
import { Rules, RuleItem } from './EasyBootValidators/baseValidator';

export class EasyBootEntity {
    private $rules: Rules;
    private errors: { [key: string]: string }
    public transform(value: string, requestArgument: EasyBootRequestArguments): HttpException | any {
        const valid = this.validator(value, requestArgument.rule)
        if (!valid) {
            if (!this.errors) this.errors = {}
            this.errors[requestArgument.key] = requestArgument.rule.message
            return;
        }
        return value
    }
    public validator(value: string, rule: RuleItem) {
        if (rule) {
            return rule.validator(value, rule.options)
        }
        return true
    }
    public getError() {
        if (Object.keys(this.errors || {}).length > 0) {
            return this.errors
        }
        return false
    }
}

export interface EasyBootEntityConstructor {
    new (...args: any[]): EasyBootEntity;
}