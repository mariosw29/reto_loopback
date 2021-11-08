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
  Docente,
} from '../models';
import {ColegioRepository} from '../repositories';

export class ColegioDocenteController {
  constructor(
    @repository(ColegioRepository) protected colegioRepository: ColegioRepository,
  ) { }

  @get('/colegios/{id}/docentes', {
    responses: {
      '200': {
        description: 'Array of Colegio has many Docente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Docente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Docente>,
  ): Promise<Docente[]> {
    return this.colegioRepository.docentes(id).find(filter);
  }

  @post('/colegios/{id}/docentes', {
    responses: {
      '200': {
        description: 'Colegio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Docente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Colegio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docente, {
            title: 'NewDocenteInColegio',
            exclude: ['id'],
            optional: ['colegioId']
          }),
        },
      },
    }) docente: Omit<Docente, 'id'>,
  ): Promise<Docente> {
    return this.colegioRepository.docentes(id).create(docente);
  }

  @patch('/colegios/{id}/docentes', {
    responses: {
      '200': {
        description: 'Colegio.Docente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docente, {partial: true}),
        },
      },
    })
    docente: Partial<Docente>,
    @param.query.object('where', getWhereSchemaFor(Docente)) where?: Where<Docente>,
  ): Promise<Count> {
    return this.colegioRepository.docentes(id).patch(docente, where);
  }

  @del('/colegios/{id}/docentes', {
    responses: {
      '200': {
        description: 'Colegio.Docente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Docente)) where?: Where<Docente>,
  ): Promise<Count> {
    return this.colegioRepository.docentes(id).delete(where);
  }
}
