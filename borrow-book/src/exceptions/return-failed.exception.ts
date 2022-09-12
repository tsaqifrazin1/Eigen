import { BadRequestException } from '@nestjs/common';

export class ReturnFailedException extends BadRequestException {
  constructor(error?: string) {
    super(error, 'error.return_failed');
  }
}
