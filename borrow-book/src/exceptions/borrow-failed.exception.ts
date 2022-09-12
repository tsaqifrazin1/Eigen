import { BadRequestException } from '@nestjs/common';

export class BorrowFailedException extends BadRequestException {
  constructor(error?: string) {
    super(error, 'error.borrow_failed');
  }
}
