import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateCategoryTranslationDto {
  @IsString()
  @IsIn(['vi', 'en', 'ja'])
  language: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
