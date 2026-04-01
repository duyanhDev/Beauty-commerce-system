import { Injectable } from '@nestjs/common';
import { CreateVariantImageDto } from './dto/create-variant_image.dto';
import { UpdateVariantImageDto } from './dto/update-variant_image.dto';

@Injectable()
export class VariantImagesService {
  create(createVariantImageDto: CreateVariantImageDto) {
    return 'This action adds a new variantImage';
  }

  findAll() {
    return `This action returns all variantImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variantImage`;
  }

  update(id: number, updateVariantImageDto: UpdateVariantImageDto) {
    return `This action updates a #${id} variantImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantImage`;
  }
}
