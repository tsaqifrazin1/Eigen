import { InjectRepository } from '@nestjs/typeorm';
import { MembersBookEntities } from 'modules/members_book/entities';
import { EntityManager, Repository, UpdateResult } from "typeorm";
import { CreateFailedException, UpdateFailedException } from 'exceptions';
import { CreateMembersBookDto } from 'modules/members_book/dtos';
import { ModuleRef } from "@nestjs/core";
import { TransactionFor } from "nest-transact";

export class MembersBookService extends TransactionFor<MembersBookService>{
  constructor(
    @InjectRepository(MembersBookEntities)
    private readonly _membersBookRepository: Repository<MembersBookEntities>,
    moduleRef: ModuleRef
  ) {
    super(moduleRef)
  }

  async create(
    createMembersBookDto: CreateMembersBookDto,
  ): Promise<MembersBookEntities> {
    const newMembersBook =
      this._membersBookRepository.create(createMembersBookDto);
    try {
      return this._membersBookRepository.save(newMembersBook);
    } catch (e) {
      console.log(e);
      throw new CreateFailedException('Failed create MembersBook');
    }
  }

  async getMembersBookByBookIdAndIsBack(
    book_id: number,
    is_back: boolean,
  ): Promise<MembersBookEntities[]> {
    return this._membersBookRepository.find({
      loadRelationIds: true,
      where: {
        is_back,
        book: {
          id: book_id,
        },
      }
    });
  }

  async getMembersBookByMemberIdAndIsBack(
    member_id: number,
    is_back: boolean,
  ): Promise<MembersBookEntities[]> {
    return this._membersBookRepository.find({
      loadRelationIds: true,
      where: {
        is_back,
        member: {
          id: member_id,
        },
      },
      take: 1,
    });
  }

  async updateIsBackTrue(
    book_id: number,
    member_id: number,
  ): Promise<void> {
    try {
      await this._membersBookRepository.update(
        {
          book: { id: book_id },
          member: { id: member_id },
          is_back: false,
        }, { is_back: true },
      );
    }catch (e){
      console.log(e)
      throw new UpdateFailedException('Failed to update MembersBook is_back')
    }
  }

  async getById(id: number): Promise<MembersBookEntities>{
    return this._membersBookRepository.find({
      relations: {
        book: true,
        member: true
      },
      where: { id },
    }).then((result) => {
      return result[0]
    })
  }
}
