import { NotFoundException } from "@nestjs/common";

export class NotFoundEntitiesException extends NotFoundException {
  constructor(error?: string) {
    super(error, 'error.not_found_exception');
  }
}
