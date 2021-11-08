import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Estudiante, EstudianteRelations, Colegio} from '../models';
import {ColegioRepository} from './colegio.repository';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.id,
  EstudianteRelations
> {

  public readonly colegio: BelongsToAccessor<Colegio, typeof Estudiante.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ColegioRepository') protected colegioRepositoryGetter: Getter<ColegioRepository>,
  ) {
    super(Estudiante, dataSource);
    this.colegio = this.createBelongsToAccessorFor('colegio', colegioRepositoryGetter,);
    this.registerInclusionResolver('colegio', this.colegio.inclusionResolver);
  }
}
