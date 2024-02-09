import {Entity, model, property, hasMany} from '@loopback/repository';
import {Tasks} from './tasks.model';

@model()
export class TasksCategories extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  CategoryID: number;

  @property({
    type: 'string',
    required: true,
  })
  CategoryName: string;

  @hasMany(() => Tasks)
  tasks: Tasks[];

  constructor(data?: Partial<TasksCategories>) {
    super(data);
  }
}

export interface TasksCategoriesRelations {
  // describe navigational properties here
}

export type TasksCategoriesWithRelations = TasksCategories & TasksCategoriesRelations;
