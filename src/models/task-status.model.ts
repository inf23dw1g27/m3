import {Entity, model, property, hasMany} from '@loopback/repository';
import {Tasks} from './tasks.model';

@model()
export class TaskStatus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  StatusID: number;

  @property({
    type: 'string',
    required: true,
  })
  StatusName: string;

  @hasMany(() => Tasks)
  tasks: Tasks[];

  constructor(data?: Partial<TaskStatus>) {
    super(data);
  }
}

export interface TaskStatusRelations {
  // describe navigational properties here
}

export type TaskStatusWithRelations = TaskStatus & TaskStatusRelations;
