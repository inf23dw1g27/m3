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
  TasksCategories,
  Tasks,
} from '../models';
import {TasksCategoriesRepository} from '../repositories';

export class TasksCategoriesTasksController {
  constructor(
    @repository(TasksCategoriesRepository) protected tasksCategoriesRepository: TasksCategoriesRepository,
  ) { }

  @get('/tasks-categories/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of TasksCategories has many Tasks',
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
    return this.tasksCategoriesRepository.tasks(id).find(filter);
  }

  @post('/tasks-categories/{id}/tasks', {
    responses: {
      '200': {
        description: 'TasksCategories model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TasksCategories.prototype.CategoryID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasksInTasksCategories',
            exclude: ['TaskID'],
            optional: ['tasksCategoriesId']
          }),
        },
      },
    }) tasks: Omit<Tasks, 'TaskID'>,
  ): Promise<Tasks> {
    return this.tasksCategoriesRepository.tasks(id).create(tasks);
  }

  @patch('/tasks-categories/{id}/tasks', {
    responses: {
      '200': {
        description: 'TasksCategories.Tasks PATCH success count',
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
    return this.tasksCategoriesRepository.tasks(id).patch(tasks, where);
  }

  @del('/tasks-categories/{id}/tasks', {
    responses: {
      '200': {
        description: 'TasksCategories.Tasks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.tasksCategoriesRepository.tasks(id).delete(where);
  }
}
