import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from './services';
import { MemberEntities } from "modules/members/entities";
import { MemberController } from "modules/members/controllers";

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntities])],
  controllers: [MemberController],
  providers: [MemberService, ],
  exports: [MemberService],
})
export class MemberModule {}
