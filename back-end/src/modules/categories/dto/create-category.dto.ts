import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCategoryTranslationDto } from './../../category_translations/dto/create-category_translation.dto';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  // 👇 category cha
  @IsOptional()
  @IsNumber()
  parentId?: number;

  // 👇 đa ngôn ngữ
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryTranslationDto)
  translation?: CreateCategoryTranslationDto[];
}
