import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  Tasks,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersTasksController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of Users has many Tasks',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tasks)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tasks>,
  ): Promise<Tasks[]> {
    return this.usersRepository.tasks(id).find(filter);
  }

  @post('/users/{id}/tasks', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.UserID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasksInUsers',
            exclude: ['TaskID'],
            optional: ['usersId']
          }),
        },
      },
    }) tasks: Omit<Tasks, 'TaskID'>,
  ): Promise<Tasks> {
    return this.usersRepository.tasks(id).create(tasks);
  }

  @patch('/users/{id}/tasks', {
    responses: {
      '200': {
        description: 'Users.Tasks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {partial: true}),
        },
      },
    })
    tasks: Partial<Tasks>,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.usersRepository.tasks(id).patch(tasks, where);
  }

  @del('/users/{id}/tasks', {
    responses: {
      '200': {
        description: 'Users.Tasks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.usersRepository.tasks(id).delete(where);
  }
}
