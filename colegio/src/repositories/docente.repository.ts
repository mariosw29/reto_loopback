import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Docente, DocenteRelations, Colegio} from '../models';
import {ColegioRepository} from './colegio.repository';

export class DocenteRepository extends DefaultCrudRepository<
  Docente,
  typeof Docente.prototype.id,
  DocenteRelations
> {

  public readonly colegio: BelongsToAccessor<Colegio, typeof Docente.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ColegioRepository') protected colegioRepositoryGetter: Getter<ColegioRepository>,
  ) {
    super(Docente, dataSource);
    this.colegio = this.createBelongsToAccessorFor('colegio', colegioRepositoryGetter,);
    this.registerInclusionResolver('colegio', this.colegio.inclusionResolver);
  }
}
