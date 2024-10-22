import {
  AfterInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

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

  @Column()
  isLoaned: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Book created with id ' + this.id);
  }
}
