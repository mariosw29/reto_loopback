import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Colegio, ColegioRelations, Docente, Estudiante} from '../models';
import {DocenteRepository} from './docente.repository';
import {EstudianteRepository} from './estudiante.repository';

export class ColegioRepository extends DefaultCrudRepository<
  Colegio,
  typeof Colegio.prototype.id,
  ColegioRelations
> {

  public readonly docentes: HasManyRepositoryFactory<Docente, typeof Colegio.prototype.id>;

  public readonly estudiantes: HasManyRepositoryFactory<Estudiante, typeof Colegio.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('DocenteRepository') protected docenteRepositoryGetter: Getter<DocenteRepository>, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Colegio, dataSource);
    this.estudiantes = this.createHasManyRepositoryFactoryFor('estudiantes', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiantes', this.estudiantes.inclusionResolver);
    this.docentes = this.createHasManyRepositoryFactoryFor('docentes', docenteRepositoryGetter,);
    this.registerInclusionResolver('docentes', this.docentes.inclusionResolver);
  }
}
