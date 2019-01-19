/**
 * @module Form
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { BASE } from '../constants/metadata.constant';

export function Form<TFunction extends Function>(target: TFunction): TFunction | void  {
    Reflect.defineMetadata(BASE.FORM, true, target)
}