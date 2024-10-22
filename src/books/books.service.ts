import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
  ) {}

  async findAll() {
    return await this.booksRepository.find();
  }

  async findOneById(id: number) {
    if (!id) return null;

    return await this.booksRepository.findOneBy({ id });
  }

  async create(book: any) {
    const bookCreated = this.booksRepository.create(book);
    await this.booksRepository.save(bookCreated);
  }

  async update(id: number, attr: Partial<any>) {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`User #${id} not found.`);
    }
    Object.assign(book, attr);
    await this.booksRepository.save(book);
  }

  async remove(id: number) {
    if (!id) return null;

    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book #${id} not found.`);
    }
    await this.booksRepository.remove(book);
    return `Book #${id} removed successfully.`;
  }
}
