import { AbstractEntity } from 'common/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { MembersDto } from '../dtos/index';
import { MembersBookEntities } from 'modules/members_book/entities';
import { MembersPenaltyEntities } from "modules/members_penalty/entities";

@Entity({
  name: 'member',
})
export class MemberEntities extends AbstractEntity<MembersDto> {
  @Column({
    unique: true,
    nullable: false,
  })
  code: string;

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(
    (type) => MembersBookEntities,
    (members_book: MembersBookEntities) => members_book.member,
    {
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  members_book?: MembersBookEntities[];

  @OneToMany(
    (type) => MembersPenaltyEntities,
    (members_penalty: MembersPenaltyEntities) => members_penalty.member,
    {
      onDelete: 'CASCADE',
      nullable: true
    },
  )
  members_penalty?: MembersPenaltyEntities;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  dtoClass = MembersDto;
}
