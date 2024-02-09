import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TaskStatus, TaskStatusRelations, Tasks} from '../models';
import {TasksRepository} from './tasks.repository';

export class TaskStatusRepository extends DefaultCrudRepository<
  TaskStatus,
  typeof TaskStatus.prototype.StatusID,
  TaskStatusRelations
> {

  public readonly tasks: HasManyRepositoryFactory<Tasks, typeof TaskStatus.prototype.StatusID>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
  ) {
    super(TaskStatus, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', tasksRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
