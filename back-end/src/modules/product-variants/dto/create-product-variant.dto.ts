import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductVariantDto {
  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  costPrice?: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  originalPrice: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  discountPercent?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  salePrice?: number;

  @IsOptional()
  saleStartAt?: Date;

  @IsOptional()
  saleEndAt?: Date;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  reserved?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  sold?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  lowStockThreshold?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  weight?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  length?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  width?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsString()
  imageThumbnail?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @Transform(({ value }) => (Array.isArray(value) ? value.map(Number) : []))
  @IsArray()
  @IsNumber({}, { each: true })
  attributeValueIds: number[];

  @IsArray()
  @IsString({ each: true })
  imageKeys: string[];

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  imageCount?: number;
}
