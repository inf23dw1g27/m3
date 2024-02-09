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
  TaskStatus,
  Tasks,
} from '../models';
import {TaskStatusRepository} from '../repositories';

export class TaskStatusTasksController {
  constructor(
    @repository(TaskStatusRepository) protected taskStatusRepository: TaskStatusRepository,
  ) { }

  @get('/task-statuses/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of TaskStatus has many Tasks',
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
    return this.taskStatusRepository.tasks(id).find(filter);
  }

  @post('/task-statuses/{id}/tasks', {
    responses: {
      '200': {
        description: 'TaskStatus model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TaskStatus.prototype.StatusID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasksInTaskStatus',
            exclude: ['TaskID'],
            optional: ['taskStatusId']
          }),
        },
      },
    }) tasks: Omit<Tasks, 'TaskID'>,
  ): Promise<Tasks> {
    return this.taskStatusRepository.tasks(id).create(tasks);
  }

  @patch('/task-statuses/{id}/tasks', {
    responses: {
      '200': {
        description: 'TaskStatus.Tasks PATCH success count',
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
    return this.taskStatusRepository.tasks(id).patch(tasks, where);
  }

  @del('/task-statuses/{id}/tasks', {
    responses: {
      '200': {
        description: 'TaskStatus.Tasks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.taskStatusRepository.tasks(id).delete(where);
  }
}
