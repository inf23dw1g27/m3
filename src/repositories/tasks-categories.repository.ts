import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {TasksCategories, TasksCategoriesRelations, Tasks} from '../models';
import {TasksRepository} from './tasks.repository';

export class TasksCategoriesRepository extends DefaultCrudRepository<
  TasksCategories,
  typeof TasksCategories.prototype.CategoryID,
  TasksCategoriesRelations
> {

  public readonly tasks: HasManyRepositoryFactory<Tasks, typeof TasksCategories.prototype.CategoryID>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
  ) {
    super(TasksCategories, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', tasksRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
