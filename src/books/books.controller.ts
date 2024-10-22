import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { BooksService } from './books.service';

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

  @Patch('/:id')
  async updateBook(@Param('id') id: string, @Body() attr: any) {
    return await this.booksService.update(parseInt(id), attr);
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string) {
    return await this.booksService.remove(parseInt(id));
  }
}
