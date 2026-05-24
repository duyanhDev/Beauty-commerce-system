import { CreateProductImageDto } from '@/modules/product-image/dto/create-product-image.dto';
import { CreateProductTranslationDto } from '@/modules/product_translations/dto/create-product_translation.dto';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  category_id: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  brand_id: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  country_id: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  gender_id: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images: CreateProductImageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductTranslationDto)
  translations: CreateProductTranslationDto[];
}
