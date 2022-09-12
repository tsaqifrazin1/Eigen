import { AbstractEntity } from 'common/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { MembersPenaltyDto } from '../dtos/index';
import { MemberEntities } from 'modules/members/entities';
import { BookEntities } from 'modules/book/entities';

@Entity({
  name: 'members_penalty',
})
export class MembersPenaltyEntities extends AbstractEntity<MembersPenaltyDto> {
  @ManyToOne(
    (type) => MemberEntities,
    (member: MemberEntities) => member.members_penalty,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  member: MemberEntities;

  @Column({ nullable: false })
  penalty_end_date: Date

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  dtoClass = MembersPenaltyDto;
}
