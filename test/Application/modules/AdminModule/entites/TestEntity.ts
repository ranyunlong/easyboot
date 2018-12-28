import { UserEntity } from './UserEntity';
import { injectable } from 'inversify'

@injectable()
export class TestEntity extends Array<UserEntity> {}