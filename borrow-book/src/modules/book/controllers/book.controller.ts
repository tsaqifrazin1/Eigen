import { BookService } from "modules/book/services";
import { Controller, Get, HttpCode, HttpStatus, UseInterceptors } from "@nestjs/common";
import { TransformResponseInterceptor } from "interceptors/transform-response.interceptor";
import { ApiTags } from "@nestjs/swagger";
import { ResponseGetAllBooksDto } from "modules/book/dtos";
import { Connection } from "typeorm";
import { getEntityManagerOrTransactionManager } from "typeorm-transactional-cls-hooked";

@Controller('book')
@ApiTags('book')
export class BookController{
  constructor(
    private readonly _bookService: BookService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformResponseInterceptor)
  async getAllAvailableBook(){
    const books = await this._bookService.getAllAvailableBook()

    const data = books.map((book) => { return new ResponseGetAllBooksDto(book)})
    return {
      message: 'Success get all available book',
      data
    }
  }
}
