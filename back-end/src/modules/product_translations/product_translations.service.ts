import { Injectable } from '@nestjs/common';
import { CreateProductTranslationDto } from './dto/create-product_translation.dto';
import { UpdateProductTranslationDto } from './dto/update-product_translation.dto';

@Injectable()
export class ProductTranslationsService {
  create(createProductTranslationDto: CreateProductTranslationDto) {
    return 'This action adds a new productTranslation';
  }

  findAll() {
    return `This action returns all productTranslations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productTranslation`;
  }

  update(id: number, updateProductTranslationDto: UpdateProductTranslationDto) {
    return `This action updates a #${id} productTranslation`;
  }

  remove(id: number) {
    return `This action removes a #${id} productTranslation`;
  }
}
