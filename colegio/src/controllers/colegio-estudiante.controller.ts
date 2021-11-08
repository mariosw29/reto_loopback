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
  Colegio,
  Estudiante,
} from '../models';
import {ColegioRepository} from '../repositories';

export class ColegioEstudianteController {
  constructor(
    @repository(ColegioRepository) protected colegioRepository: ColegioRepository,
  ) { }

  @get('/colegios/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Array of Colegio has many Estudiante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Estudiante>,
  ): Promise<Estudiante[]> {
    return this.colegioRepository.estudiantes(id).find(filter);
  }

  @post('/colegios/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Colegio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estudiante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colegio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {
            title: 'NewEstudianteInColegio',
            exclude: ['id'],
            optional: ['colegioId']
          }),
        },
      },
    }) estudiante: Omit<Estudiante, 'id'>,
  ): Promise<Estudiante> {
    return this.colegioRepository.estudiantes(id).create(estudiante);
  }

  @patch('/colegios/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Colegio.Estudiante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {partial: true}),
        },
      },
    })
    estudiante: Partial<Estudiante>,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.colegioRepository.estudiantes(id).patch(estudiante, where);
  }

  @del('/colegios/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Colegio.Estudiante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.colegioRepository.estudiantes(id).delete(where);
  }
}
