import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { MemberEntities } from "../entities";
import { IsOptional } from "class-validator";
import { MembersBookDto } from "modules/members_book/dtos";
import { MembersBookEntities } from "modules/members_book/entities";
import { MembersDto } from "modules/members/dtos/members.dto";

export class ResponseGetAllMembersDto extends AbstractDto{
  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly total: number;

  constructor(member: MemberEntities) {
    super(member)
    this.code = member.code;
    this.name = member.name;
    this.total = member.members_book.length
  }
}
