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
import { User } from '../users/users.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/all')
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    const user = await this.booksService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`Book #${id} not found.`);
    }
    return user;
  }

  @Post()
  @Serialize(BookDto)
  async createBook(@Body() book: CreateBookDto) {
    return await this.booksService.create(book);
  }

  @Patch('/:id')
  async updateBook(@Param('id') id: string, @Body() attr: any) {
    return await this.booksService.update(parseInt(id), attr);
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string) {
    return await this.booksService.remove(parseInt(id));
  }
}
