import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository, UpdateResult } from "typeorm";
import { BookEntities } from 'modules/book/entities';
import { BorrowFailedException, NotFoundEntitiesException } from "exceptions";
import { TransactionFor } from "nest-transact";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class BookService extends TransactionFor<BookService> implements OnModuleInit {
  constructor(
    @InjectRepository(BookEntities)
    private readonly _bookRepository: Repository<BookEntities>,
    moduleRef: ModuleRef
  ) {
    super(moduleRef)
  }

  async onModuleInit(): Promise<void> {
    await this._bookRepository
      .createQueryBuilder()
      .insert()
      .into(BookEntities)
      .values([
        {
          code: 'JK-45',
          title: 'Harry Potter',
          author: 'J.K Rowling',
          stock: 1,
          borrowed: 0,
        },
        {
          code: 'SHR-1',
          title: 'A Study in Scarlet',
          author: 'Arthur Conan Doyle',
          stock: 1,
          borrowed: 0,
        },
        {
          code: 'TW-11',
          title: 'Twilight',
          author: 'Stephenie Meyer',
          stock: 1,
          borrowed: 0,
        },
        {
          code: 'HOB-83',
          title: 'The Hobbit, or There and Back Again',
          author: 'J.R.R. Tolkien',
          stock: 1,
          borrowed: 0,
        },
        {
          code: 'NRN-7',
          title: 'The Lion, the Witch and the Wardrobe',
          author: 'C.S. Lewis',
          stock: 1,
          borrowed: 0,
        },
      ])
      .orIgnore()
      .execute();
  }

  async getBook(id: number): Promise<BookEntities> {
    return this._bookRepository.findOneBy({ id })
      .then((response) => {
        if (!response) throw new NotFoundEntitiesException('Not Found Book');
        return response;
    });
  }

  async updateBookBorrowed(book: BookEntities, qty: number): Promise<void>{
    await this._bookRepository.save({
      ...book,
      borrowed: book.borrowed + qty,
    })
  }

  async getAllAvailableBook(): Promise<BookEntities[]>{
    return this._bookRepository.createQueryBuilder('b')
      .where('b.stock > b.borrowed')
      .getMany()
  }
}
