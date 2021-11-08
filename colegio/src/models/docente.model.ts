import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Colegio} from './colegio.model';

@model()
export class Docente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'number',
    required: true,
  })
  grados: number;

  @property({
    type: 'string',
    required: true,
  })
  materia: string;

  @belongsTo(() => Colegio)
  colegioId: string;

  constructor(data?: Partial<Docente>) {
    super(data);
  }
}

export interface DocenteRelations {
  // describe navigational properties here
}

export type DocenteWithRelations = Docente & DocenteRelations;
