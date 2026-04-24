import { CreateProductImageDto } from "@/modules/product-image/dto/create-product-image.dto";
import { CreateProductTranslationDto } from "@/modules/product_translations/dto/create-product_translation.dto";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateProductDto {
  
    @IsString()
    name:string;

    @IsString()
    description:string;
     
    @IsNumber()
    category_id:number;

    @IsNumber()
    brand_id:number;

    @IsNumber()
    country_id:number;
    
    @IsNumber()
    gender_id:number;

    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>CreateProductImageDto)
    images:CreateProductImageDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>CreateProductTranslationDto)
    translations:CreateProductTranslationDto[]
}