import { PartialType } from '@nestjs/swagger';
import { CreateProductTranslationDto } from './create-product_translation.dto';

export class UpdateProductTranslationDto extends PartialType(CreateProductTranslationDto) {}
