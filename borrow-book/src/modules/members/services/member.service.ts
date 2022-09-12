import {
  Injectable, NotFoundException,
  OnModuleInit
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberEntities } from "modules/members/entities";
import { Repository } from "typeorm";
import { NotFoundEntitiesException } from "exceptions";
import { TransactionFor } from "nest-transact";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class MemberService extends TransactionFor<MemberService> implements OnModuleInit {
  constructor(
    @InjectRepository(
      MemberEntities
    )
    private readonly _memberRepository: Repository<MemberEntities>,
    moduleRef: ModuleRef
  ) {
    super(moduleRef)
}

  async onModuleInit(): Promise<void> {
    await this._memberRepository
      .createQueryBuilder()
      .insert()
      .into(
        MemberEntities
      )
      .values([
        {
          code: "M001",
          name: "Angga"
        },
        {
          code: "M002",
          name: "Ferry"
        },
        {
          code: "M003",
          name: "Putri"
        }
      ])
      .orIgnore()
      .execute();
  }

  async getMember(id: number): Promise<MemberEntities>{
    return this._memberRepository.findOneBy({ id }).then((response) => {
      if(!response) throw new NotFoundEntitiesException('Not Found Member')
      return response
    })
  }

  async getAllMember(): Promise<MemberEntities[]>{
    return this._memberRepository.find({
      relations:{
        members_book: true
      }
    })
  }
}
