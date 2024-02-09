import {Entity, model, property, hasMany} from '@loopback/repository';
import {Tasks} from './tasks.model';

@model()
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  UserID: number;

  @property({
    type: 'string',
    required: true,
  })
  UserName: string;

  @property({
    type: 'string',
  })
  Email?: string;

  @hasMany(() => Tasks)
  tasks: Tasks[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
