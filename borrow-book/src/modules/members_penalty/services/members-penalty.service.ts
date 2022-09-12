import { InjectRepository } from "@nestjs/typeorm";
import { MembersPenaltyEntities } from "modules/members_penalty/entities";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { CreateFailedException } from "exceptions";
import { CreateMembersPenaltyDto } from "modules/members_penalty/dtos/create-members-penalty.dto";
import { TransactionFor } from "nest-transact";
import { ModuleRef } from "@nestjs/core";

export class MembersPenaltyService extends TransactionFor<MembersPenaltyService> {
  constructor(
    @InjectRepository(MembersPenaltyEntities) private readonly _membersPenaltyRepository: Repository<MembersPenaltyEntities>,
    moduleRef: ModuleRef
  ) {
    super(moduleRef)
  }

  async createMembersPenalty( createMemberPenaltyDto: CreateMembersPenaltyDto): Promise<MembersPenaltyEntities>{
    const newMembersPenalty = this._membersPenaltyRepository.create(createMemberPenaltyDto)
    try{
      return this._membersPenaltyRepository.save(newMembersPenalty)
    } catch(e){
      console.log(e)
      throw new CreateFailedException("Failed create MembersPenalty")
    }
  }

  async getMemberPenalty(member_id: number): Promise<MembersPenaltyEntities>{
    return this._membersPenaltyRepository.findOneBy({
      member:{
        id: member_id
      },
      penalty_end_date: MoreThanOrEqual(new Date(Date.now()))
    })
  }
}
