import { PartialType } from '@nestjs/swagger';
import { CreateVariantAttributeValueDto } from './create-variant-attribute-value.dto';

export class UpdateVariantAttributeValueDto extends PartialType(CreateVariantAttributeValueDto) {}
