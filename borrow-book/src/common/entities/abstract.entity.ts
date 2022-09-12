import { AbstractDto } from '../dtos';
import { UtilsService } from 'utils/services';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
  @PrimaryGeneratedColumn('increment',{ type: 'bigint'})
  id: number;

  abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

  toDto?(options?: any): T {
    return UtilsService.toDto(this.dtoClass, this, options);
  }
}
