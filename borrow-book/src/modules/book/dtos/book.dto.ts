import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'common/dtos';
import { BookEntities } from '../entities';

export class BookDto extends AbstractDto {
  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly author: string;

  @ApiProperty()
  readonly quantity: number;

  constructor(book: BookEntities) {
    super(book);
    this.code = book.code;
    this.title = book.title;
    this.author = book.author;
  }
}
