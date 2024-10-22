import {
  AfterInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from '../books/books.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Book, (book: Book) => book.user)
  booksLoaned: Book[];

  @AfterInsert()
  logInsert() {
    console.log('User created with id ' + this.id);
  }
}
