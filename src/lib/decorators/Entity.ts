import { MetadataEnums } from '../enums';
import { EasyBootEntity } from '../Entity';

export function Entity(entity: EasyBootEntity, entityType: EntityType = 'array'): ClassDecorator;
export function Entity<TFunction extends Function>(target: TFunction): void | TFunction;
export function Entity(...args: any []): any {
    if (args.length === 2) {
        return <TFunction extends Function>(target: TFunction): void | TFunction => {
            Reflect.defineMetadata(MetadataEnums.Entity.ARRAY, target, target)
        }
    } else {
        Reflect.defineMetadata(MetadataEnums.Entity.DEFAULT, args[0], args[0])
    }
}

type EntityType = 'array' | 'defalut'