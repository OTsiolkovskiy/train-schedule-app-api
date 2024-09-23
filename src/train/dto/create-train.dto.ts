import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTrainDto {
  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  departure: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  arrival: Date;
}
