import { PartialType } from '@nestjs/swagger';
import { CreateCategoryTranslationDto } from './create-category_translation.dto';

export class UpdateCategoryTranslationDto extends PartialType(CreateCategoryTranslationDto) {}
