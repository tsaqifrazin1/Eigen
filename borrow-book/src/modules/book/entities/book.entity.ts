import { AbstractEntity } from "common/entities";
import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { BookDto } from "../dtos/index";
import { MembersBookEntities } from "modules/members_book/entities";

@Entity({ name: "book" })
export class BookEntities extends AbstractEntity<BookDto> {
  @Column({ unique: true, nullable: false })
  code: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: false })
  borrowed: number;

  @OneToMany(
    (type) => MembersBookEntities,
    (members_book: MembersBookEntities) => members_book.book,
    {
      onDelete: 'CASCADE',
    },
  )
  members_book?: MembersBookEntities;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt: Date;

  dtoClass = BookDto;
}
