import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VariantImagesService } from './variant_images.service';
import { CreateVariantImageDto } from './dto/create-variant_image.dto';
import { UpdateVariantImageDto } from './dto/update-variant_image.dto';

@Controller('variant-images')
export class VariantImagesController {
  constructor(private readonly variantImagesService: VariantImagesService) {}

  @Post()
  create(@Body() createVariantImageDto: CreateVariantImageDto) {
    return this.variantImagesService.create(createVariantImageDto);
  }

  @Get()
  findAll() {
    return this.variantImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariantImageDto: UpdateVariantImageDto) {
    return this.variantImagesService.update(+id, updateVariantImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantImagesService.remove(+id);
  }
}
