import {Entity, model, property, hasMany} from '@loopback/repository';
import {Docente} from './docente.model';
import {Estudiante} from './estudiante.model';

@model()
export class Colegio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreColegio: string;

  @hasMany(() => Docente)
  docentes: Docente[];

  @hasMany(() => Estudiante)
  estudiantes: Estudiante[];

  constructor(data?: Partial<Colegio>) {
    super(data);
  }
}

export interface ColegioRelations {
  // describe navigational properties here
}

export type ColegioWithRelations = Colegio & ColegioRelations;
