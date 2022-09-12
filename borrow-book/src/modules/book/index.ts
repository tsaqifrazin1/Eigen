import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './services';
import { BookEntities } from "modules/book/entities";
import { BookController } from "modules/book/controllers";

@Module({
  imports: [TypeOrmModule.forFeature([BookEntities])],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}

