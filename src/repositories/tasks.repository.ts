import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tasks, TasksRelations} from '../models';

export class TasksRepository extends DefaultCrudRepository<
  Tasks,
  typeof Tasks.prototype.TaskID,
  TasksRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Tasks, dataSource);
  }
}
