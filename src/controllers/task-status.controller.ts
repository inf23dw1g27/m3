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
import {TaskStatus} from '../models';
import {TaskStatusRepository} from '../repositories';

export class TaskStatusController {
  constructor(
    @repository(TaskStatusRepository)
    public taskStatusRepository : TaskStatusRepository,
  ) {}

  @post('/taskstatus')
  @response(200, {
    description: 'TaskStatus model instance',
    content: {'application/json': {schema: getModelSchemaRef(TaskStatus)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaskStatus, {
            title: 'NewTaskStatus',
            exclude: ['StatusID'],
          }),
        },
      },
    })
    taskStatus: Omit<TaskStatus, 'StatusID'>,
  ): Promise<TaskStatus> {
    return this.taskStatusRepository.create(taskStatus);
  }

  @get('/taskstatus/count')
  @response(200, {
    description: 'TaskStatus model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TaskStatus) where?: Where<TaskStatus>,
  ): Promise<Count> {
    return this.taskStatusRepository.count(where);
  }

  @get('/taskstatus')
  @response(200, {
    description: 'Array of TaskStatus model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TaskStatus, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TaskStatus) filter?: Filter<TaskStatus>,
  ): Promise<TaskStatus[]> {
    return this.taskStatusRepository.find(filter);
  }

  @patch('/taskstatus')
  @response(200, {
    description: 'TaskStatus PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaskStatus, {partial: true}),
        },
      },
    })
    taskStatus: TaskStatus,
    @param.where(TaskStatus) where?: Where<TaskStatus>,
  ): Promise<Count> {
    return this.taskStatusRepository.updateAll(taskStatus, where);
  }

  @get('/taskstatus/{id}')
  @response(200, {
    description: 'TaskStatus model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TaskStatus, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TaskStatus, {exclude: 'where'}) filter?: FilterExcludingWhere<TaskStatus>
  ): Promise<TaskStatus> {
    return this.taskStatusRepository.findById(id, filter);
  }

  @patch('/taskstatus/{id}')
  @response(204, {
    description: 'TaskStatus PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TaskStatus, {partial: true}),
        },
      },
    })
    taskStatus: TaskStatus,
  ): Promise<void> {
    await this.taskStatusRepository.updateById(id, taskStatus);
  }

  @put('/taskstatus/{id}')
  @response(204, {
    description: 'TaskStatus PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() taskStatus: TaskStatus,
  ): Promise<void> {
    await this.taskStatusRepository.replaceById(id, taskStatus);
  }

  @del('/taskstatus/{id}')
  @response(204, {
    description: 'TaskStatus DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.taskStatusRepository.deleteById(id);
  }
}
