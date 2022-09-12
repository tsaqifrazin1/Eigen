import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "common/dtos";
import { MembersPenaltyEntities } from "../entities";

export class MembersPenaltyDto extends AbstractDto {
  @ApiProperty()
  readonly member_id: number;

  @ApiProperty()
  readonly penalty_end_date: Date;

  constructor(members_penalty: MembersPenaltyEntities) {
    super(members_penalty);
    this.member_id = members_penalty.member.id;
    this.penalty_end_date = members_penalty.penalty_end_date;
  }
}
