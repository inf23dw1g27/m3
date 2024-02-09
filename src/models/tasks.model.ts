import {Entity, model, property} from '@loopback/repository';

@model()
export class Tasks extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  TaskID: number;

  @property({
    type: 'string',
    required: true,
  })
  Title: string;

  @property({
    type: 'string',
  })
  Description?: string;

  @property({
    type: 'date',
    required: true,
  })
  DueDate: string;

  @property({
    type: 'number',
    required: true,
  })
  UserID: number;

  @property({
    type: 'number',
    required: true,
  })
  CategoryID: number;

  @property({
    type: 'number',
    required: true,
  })
  StatusID: number;

  @property({
    type: 'number',
  })
  usersId?: number;

  @property({
    type: 'number',
  })
  taskStatusId?: number;

  @property({
    type: 'number',
  })
  tasksCategoriesId?: number;

  constructor(data?: Partial<Tasks>) {
    super(data);
  }
}

export interface TasksRelations {
  // describe navigational properties here
}

export type TasksWithRelations = Tasks & TasksRelations;
