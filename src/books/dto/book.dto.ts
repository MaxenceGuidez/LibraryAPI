import { Expose, Transform } from 'class-transformer';

export class BookDto {
  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  gender: string;

  @Expose()
  rating: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
