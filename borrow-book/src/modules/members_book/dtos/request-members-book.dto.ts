import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class RequestMembersBookDto{
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly member_id: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly book_id: number
}
