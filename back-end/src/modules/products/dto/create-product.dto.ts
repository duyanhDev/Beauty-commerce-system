import { CreateProductImageDto } from '@/modules/product-image/dto/create-product-image.dto';
import { CreateProductVariantDto } from '@/modules/product-variants/dto/create-product-variant.dto';
import { CreateProductTranslationDto } from '@/modules/product_translations/dto/create-product_translation.dto';
import { plainToInstance, Transform, Type } from 'class-transformer';
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

  @Transform(({ value }) => {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed)
      ? plainToInstance(CreateProductVariantDto, parsed)
      : [];
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants: CreateProductVariantDto[];

  @IsOptional()
  @IsString()
  attributeValueImageMap?: string;
}
