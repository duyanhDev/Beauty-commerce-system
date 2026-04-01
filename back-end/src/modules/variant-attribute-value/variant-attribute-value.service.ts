import { Injectable } from '@nestjs/common';
import { CreateVariantAttributeValueDto } from './dto/create-variant-attribute-value.dto';
import { UpdateVariantAttributeValueDto } from './dto/update-variant-attribute-value.dto';

@Injectable()
export class VariantAttributeValueService {
  create(createVariantAttributeValueDto: CreateVariantAttributeValueDto) {
    return 'This action adds a new variantAttributeValue';
  }

  findAll() {
    return `This action returns all variantAttributeValue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variantAttributeValue`;
  }

  update(id: number, updateVariantAttributeValueDto: UpdateVariantAttributeValueDto) {
    return `This action updates a #${id} variantAttributeValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantAttributeValue`;
  }
}
