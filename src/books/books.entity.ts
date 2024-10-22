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
  titre: string;

  @Column()
  auteur: string;

  @Column()
  genre: string;

  @Column()
  rating: string;

  @Column()
  email: string;

  // @ManyToOne(() => User, (user: User) => user.booksLoaned)
  // user: User;

  @AfterInsert()
  logInsert() {
    console.log('Book created with id ' + this.id);
  }
}
