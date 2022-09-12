import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { MemberEntities } from "../entities";
import { IsOptional } from "class-validator";
import { MembersBookDto } from "modules/members_book/dtos";
import { MembersBookEntities } from "modules/members_book/entities";
import { ResponseGetAllMembersDto } from "modules/members/dtos/response-get-all-members.dto";

export class MembersDto extends AbstractDto {
  @ApiProperty()
  readonly code: string;

  @ApiProperty()
  readonly name: string;

  constructor(member: MemberEntities) {
    super(member);
    this.code = member.code;
    this.name = member.name;
  }
}
