import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { MembersBookEntities } from "../entities";
import { MemberEntities } from "modules/members/entities";
import { BookEntities } from "modules/book/entities";

export class CreateMembersBookDto{
  @ApiProperty()
  readonly member: MemberEntities

  @ApiProperty()
  readonly book: BookEntities

  @ApiProperty()
  readonly is_back: boolean;

  @ApiProperty()
  readonly borrowedAt: Date;
}
