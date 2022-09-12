import { isArray, capitalize } from 'lodash';
import * as crypto from 'crypto';

export class UtilsService {
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E,
    options?: any,
  ): T;
  public static toDto<T, E>(
    model: new (entity: E, options?: any) => T,
    entity: E[],
    options?: any,
  ): T[];
  public static toDto<T, E>(
    model: new (entity: E | E[], options?: any) => T,
    entity: E | E[],
    options?: any,
  ): T | T[] {
    if (isArray(entity)) {
      return [entity].map((u) => new model(u, options));
    }

    return new model(entity, options);
  }
}
