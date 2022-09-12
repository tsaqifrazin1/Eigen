import { AbstractEntity } from 'common/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { MembersBookDto } from '../dtos/index';
import { MemberEntities } from 'modules/members/entities';
import { BookEntities } from 'modules/book/entities';

@Entity({
  name: 'members_book',
})
export class MembersBookEntities extends AbstractEntity<MembersBookDto> {
  @ManyToOne(
    (type) => MemberEntities,
    (member: MemberEntities) => member.members_book,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  member: MemberEntities;

  @ManyToOne(
    (type) => BookEntities,
    (book: BookEntities) => book.members_book,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  book: BookEntities;

  @Column({
    nullable: false,
  })
  is_back: boolean;

  @CreateDateColumn()
  borrowedAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  backedAt: Date;

  dtoClass = MembersBookDto;
}
