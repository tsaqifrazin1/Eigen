import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { MemberEntities } from "modules/members/entities";

export class CreateMembersPenaltyDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly member: MemberEntities;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  readonly penalty_end_date: Date
}
