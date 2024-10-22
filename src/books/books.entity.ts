import {
  AfterInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  gender: string;

  @Column()
  rating: number;

  // @ManyToOne(() => User, (user: User) => user.booksLoaned)
  // user: User;

  @AfterInsert()
  logInsert() {
    console.log('Book created with id ' + this.id);
  }
}
