import { MembersBookService } from "modules/members_book/services";
import { MembersPenaltyService } from "modules/members_penalty/services";
import { BookService } from "modules/book/services";
import { Controller, Get, HttpCode, HttpStatus, UseInterceptors } from "@nestjs/common";
import { TransformResponseInterceptor } from "interceptors/transform-response.interceptor";
import { ApiTags } from "@nestjs/swagger";
import { MemberService } from "modules/members/services";
import { ResponseGetAllMembersDto } from "modules/members/dtos";
import { MemberEntities } from "modules/members/entities";

@Controller('members')
@ApiTags('members')
export class MemberController {
  constructor(
    private readonly _memberService: MemberService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformResponseInterceptor)
  async getAllAvailableBook(){
    const members = await this._memberService.getAllMember()

    const data = members.map((member) => { return new ResponseGetAllMembersDto(member) })

    return {
      message: 'Success get all available book',
      data
    }
  }
}
