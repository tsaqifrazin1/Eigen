import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors
} from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { TransformResponseInterceptor } from 'interceptors/transform-response.interceptor';
import { MembersBookService } from 'modules/members_book/services';
import { MembersPenaltyService } from 'modules/members_penalty/services';
import { BorrowFailedException } from 'exceptions/borrow-failed.exception';
import { MemberService } from 'modules/members/services';
import { BookService } from 'modules/book/services';
import { MembersBookDto, RequestMembersBookDto } from "modules/members_book/dtos";
import { ReturnFailedException } from "exceptions/return-failed.exception";
import { Transactional } from "typeorm-transactional-cls-hooked";
import { DataSource } from "typeorm";

@Controller('members-book')
@ApiTags('members-book')
export class MembersBookController {

  readonly MAX_RETURN_DAYS = 7
  readonly PENALTY_DAYS = 3

  constructor(
    private readonly _membersBookService: MembersBookService,
    private readonly _membersPenaltyService: MembersPenaltyService,
    private readonly _memberService: MemberService,
    private readonly _bookService: BookService,
    private readonly dataSource: DataSource,
  ) {}

  // @Transactional()
  @Post('borrow')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TransformResponseInterceptor)
  async borrowBook(
    @Body() requestMembersBookDto: RequestMembersBookDto
  ) {
    const membersBook = await this.dataSource.transaction(async manager => {
      const { member_id, book_id } = requestMembersBookDto
      const member = await this._memberService.withTransaction(manager).getMember(member_id);
      const book = await this._bookService.withTransaction(manager).getBook(book_id);

      const memberPenaltyCheck =
        await this._membersPenaltyService.withTransaction(manager).getMemberPenalty(member_id);
      if (memberPenaltyCheck)
        throw new BorrowFailedException('You still got penalty');

      const membersBookBorrowedCheck =
        await this._membersBookService.withTransaction(manager).getMembersBookByMemberIdAndIsBack(
          member_id,
          false,
        ).then(result => { return result[0] });
      if (membersBookBorrowedCheck)
        throw new BorrowFailedException(
          'Members only allowed to borrow one book',
        );

      const booksBorrowedByOthersCheck =
        await this._membersBookService.withTransaction(manager).getMembersBookByBookIdAndIsBack(
          book_id,
          false,
        );
      if (booksBorrowedByOthersCheck.length && booksBorrowedByOthersCheck.length >= book.stock)
        throw new BorrowFailedException('Book borrowed by other member');

      const membersBook = await this._membersBookService.withTransaction(manager).create({
        is_back: false,
        member,
        book,
        borrowedAt: new Date(Date.now()),
      });

      await this._bookService.withTransaction(manager).updateBookBorrowed(book, 1)
      return membersBook
    })

    return {
      message: 'Success borrowed a book',
      data: membersBook.toDto()
    };
  }

  @Post('return')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TransformResponseInterceptor)
  async returnBook(
    @Body() requestMembersBookDto: RequestMembersBookDto
  ){
    const { member_id, book_id } = requestMembersBookDto
    const updatedMembersBook = await this.dataSource.transaction(async manager => {
      const member = await this._memberService.withTransaction(manager).getMember(member_id);
      const book = await this._bookService.withTransaction(manager).getBook(book_id);

      const membersBookBorrowedCheck =
        await this._membersBookService.withTransaction(manager).getMembersBookByMemberIdAndIsBack(
          member_id,
          false,
        ).then(result => { return result[0] });
      if(!membersBookBorrowedCheck) throw new ReturnFailedException("The Book doesn't borrowed")
      if (Number(membersBookBorrowedCheck.book) !== book_id )
        throw new ReturnFailedException(
          'Please return the same book you borrowed',
        );

      if (!(new Date(membersBookBorrowedCheck.borrowedAt.getTime()) <= new Date(new Date().setDate(new Date().getDate() - this.MAX_RETURN_DAYS)))) {
        await this._membersPenaltyService.withTransaction(manager).createMembersPenalty({
          member,
          penalty_end_date: new Date(new Date().setDate(new Date().getDate() + this.PENALTY_DAYS))
        })
      }

      await this._membersBookService.withTransaction(manager).updateIsBackTrue(book_id, member_id)

      const updatedMembersBook = await this._membersBookService.withTransaction(manager).getById(membersBookBorrowedCheck.id)
      await this._bookService.withTransaction(manager).updateBookBorrowed(book, -1)
      return updatedMembersBook
    })
    return {
      message: "Success Return Book",
      data: updatedMembersBook.toDto()
    }
  }
}


