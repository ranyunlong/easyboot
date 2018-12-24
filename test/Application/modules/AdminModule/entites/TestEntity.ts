import { Injectable } from '../../../../../src';
import { UserEntity } from './UserEntity';

@Injectable
export class TestEntity extends Array<UserEntity> {}