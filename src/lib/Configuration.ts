import { TClass } from './Module';

/**
 * @module Configuration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

export function Configuration(Config: TClass) {
    return <T extends ConfigurationTargetClass>(target: T): void => {
        target.prototype.configs = new Config()
    }
}

export interface ConfigurationTargetClass {
    new (...args: any[]): {
        configs: any;
    };
}