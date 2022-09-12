import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersPenaltyEntities } from "modules/members_penalty/entities";
import { MembersPenaltyService } from "modules/members_penalty/services";

@Module({
  imports: [TypeOrmModule.forFeature([MembersPenaltyEntities])],
  providers: [MembersPenaltyService],
  exports: [MembersPenaltyService],
})
export class MembersPenaltyModule {}
