import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Estudiante,
  Colegio,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteColegioController {
  constructor(
    @repository(EstudianteRepository)
    public estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/colegio', {
    responses: {
      '200': {
        description: 'Colegio belonging to Estudiante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Colegio)},
          },
        },
      },
    },
  })
  async getColegio(
    @param.path.string('id') id: typeof Estudiante.prototype.id,
  ): Promise<Colegio> {
    return this.estudianteRepository.colegio(id);
  }
}
