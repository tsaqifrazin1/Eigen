import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersBookEntities } from "modules/members_book/entities";
import { MembersBookService } from "modules/members_book/services";
import { MemberService } from "modules/members/services";
import { MemberModule } from "modules/members";
import { BookModule } from "modules/book";
import { MembersPenaltyModule } from "modules/members_penalty";
import { MembersBookController } from "modules/members_book/controllers";

@Module({
  imports: [
    MemberModule,
    BookModule,
    MembersPenaltyModule,
    TypeOrmModule.forFeature([MembersBookEntities])],
  controllers: [MembersBookController],
  providers: [MembersBookService],
  exports: [MembersBookService],
})
export class MembersBookModule {}
