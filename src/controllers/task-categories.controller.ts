import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TasksCategories} from '../models';
import {TasksCategoriesRepository} from '../repositories';

export class TaskCategoriesController {
  constructor(
    @repository(TasksCategoriesRepository)
    public tasksCategoriesRepository : TasksCategoriesRepository,
  ) {}

  @post('/taskcategories')
  @response(200, {
    description: 'TasksCategories model instance',
    content: {'application/json': {schema: getModelSchemaRef(TasksCategories)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TasksCategories, {
            title: 'NewTasksCategories',
            exclude: ['CategoryID'],
          }),
        },
      },
    })
    tasksCategories: Omit<TasksCategories, 'CategoryID'>,
  ): Promise<TasksCategories> {
    return this.tasksCategoriesRepository.create(tasksCategories);
  }

  @get('/taskcategories/count')
  @response(200, {
    description: 'TasksCategories model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TasksCategories) where?: Where<TasksCategories>,
  ): Promise<Count> {
    return this.tasksCategoriesRepository.count(where);
  }

  @get('/taskcategories')
  @response(200, {
    description: 'Array of TasksCategories model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TasksCategories, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TasksCategories) filter?: Filter<TasksCategories>,
  ): Promise<TasksCategories[]> {
    return this.tasksCategoriesRepository.find(filter);
  }

  @patch('/taskcategories')
  @response(200, {
    description: 'TasksCategories PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TasksCategories, {partial: true}),
        },
      },
    })
    tasksCategories: TasksCategories,
    @param.where(TasksCategories) where?: Where<TasksCategories>,
  ): Promise<Count> {
    return this.tasksCategoriesRepository.updateAll(tasksCategories, where);
  }

  @get('/taskcategories/{id}')
  @response(200, {
    description: 'TasksCategories model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TasksCategories, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TasksCategories, {exclude: 'where'}) filter?: FilterExcludingWhere<TasksCategories>
  ): Promise<TasksCategories> {
    return this.tasksCategoriesRepository.findById(id, filter);
  }

  @patch('/taskcategories/{id}')
  @response(204, {
    description: 'TasksCategories PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TasksCategories, {partial: true}),
        },
      },
    })
    tasksCategories: TasksCategories,
  ): Promise<void> {
    await this.tasksCategoriesRepository.updateById(id, tasksCategories);
  }

  @put('/taskcategories/{id}')
  @response(204, {
    description: 'TasksCategories PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tasksCategories: TasksCategories,
  ): Promise<void> {
    await this.tasksCategoriesRepository.replaceById(id, tasksCategories);
  }

  @del('/taskcategories/{id}')
  @response(204, {
    description: 'TasksCategories DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tasksCategoriesRepository.deleteById(id);
  }
}
