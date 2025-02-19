import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/all')
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    const book = await this.booksService.findOneById(id);
    if (!book) {
      throw new NotFoundException(`Book #${id} not found.`);
    }
    return book;
  }

  @Post()
  @Serialize(BookDto)
  async createBook(@Body() book: CreateBookDto) {
    const newBook = { ...book, isLoaned: false };
    return await this.booksService.create(newBook);
  }

  @Patch('/:id')
  async updateBook(@Param('id') id: string, @Body() attr: any) {
    return await this.booksService.update(parseInt(id), attr);
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string) {
    return await this.booksService.remove(parseInt(id));
  }

  @Get('loan/:id')
  @Serialize(BookDto)
  async loanBook(@Param('id') id: string) {
    const book = await this.booksService.findOneById(parseInt(id));
    if (!book) {
      throw new NotFoundException(`Book #${id} not found.`);
    }

    if (book.isLoaned) {
      throw new Error(`Book #${id} is already loaned.`);
    }

    const updatedBook = { ...book, isLoaned: true };
    return await this.booksService.update(parseInt(id), updatedBook);
  }
}
