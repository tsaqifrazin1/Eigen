import { AbstractEntity } from 'common/entities';

export class AbstractDto {
  id: number;

  constructor(abstract: AbstractEntity) {
    this.id = abstract.id;
  }
}
