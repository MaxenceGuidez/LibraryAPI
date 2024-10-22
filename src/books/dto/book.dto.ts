import { Expose } from 'class-transformer';

export class BookDto {
  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  gender: string;

  @Expose()
  rating: number;

  @Expose()
  isLoaned: boolean;
}
