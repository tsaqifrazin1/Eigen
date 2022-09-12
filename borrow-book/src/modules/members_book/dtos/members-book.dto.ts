import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { MembersBookEntities } from "../entities";
import { MembersDto } from "modules/members/dtos";
import { IsOptional } from "class-validator";
import { BookDto } from "modules/book/dtos";

export class MembersBookDto extends AbstractDto {
  @ApiProperty()
  readonly is_back: boolean;

  @ApiProperty()
  readonly borrowedAt: Date;

  @ApiProperty()
  readonly backedAt: Date;

  @ApiPropertyOptional({ type: MembersDto })
  @IsOptional()
  readonly member?: MembersDto

  @ApiPropertyOptional({ type: BookDto })
  @IsOptional()
  readonly book?: BookDto

  constructor(members_book: MembersBookEntities) {
    super(members_book);
    this.member = members_book.member?.toDto();
    this.book = members_book.book?.toDto();
    this.is_back = members_book.is_back;
    this.borrowedAt = members_book.borrowedAt;
    this.borrowedAt = members_book.borrowedAt;
    this.backedAt = members_book.backedAt;
  }
}
