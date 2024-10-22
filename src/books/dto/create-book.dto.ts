import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  gender: string;

  @IsNumber()
  rating: number;
}
