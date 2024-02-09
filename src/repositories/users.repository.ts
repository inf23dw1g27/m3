import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Users, UsersRelations, Tasks} from '../models';
import {TasksRepository} from './tasks.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.UserID,
  UsersRelations
> {

  public readonly tasks: HasManyRepositoryFactory<Tasks, typeof Users.prototype.UserID>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
  ) {
    super(Users, dataSource);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', tasksRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
