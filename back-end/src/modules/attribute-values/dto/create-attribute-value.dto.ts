import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateAttributeValueDto {
  @IsString()
  @IsNotEmpty()
  value: string; // "Đỏ", "50ml", "Da dầu"

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  atrribute_id: number;
}
