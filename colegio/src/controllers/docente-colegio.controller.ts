import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Docente,
  Colegio,
} from '../models';
import {DocenteRepository} from '../repositories';

export class DocenteColegioController {
  constructor(
    @repository(DocenteRepository)
    public docenteRepository: DocenteRepository,
  ) { }

  @get('/docentes/{id}/colegio', {
    responses: {
      '200': {
        description: 'Colegio belonging to Docente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Colegio)},
          },
        },
      },
    },
  })
  async getColegio(
    @param.path.string('id') id: typeof Docente.prototype.id,
  ): Promise<Colegio> {
    return this.docenteRepository.colegio(id);
  }
}
