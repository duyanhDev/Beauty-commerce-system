import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductTranslationsService } from './product_translations.service';
import { CreateProductTranslationDto } from './dto/create-product_translation.dto';
import { UpdateProductTranslationDto } from './dto/update-product_translation.dto';

@Controller('product-translations')
export class ProductTranslationsController {
  constructor(private readonly productTranslationsService: ProductTranslationsService) {}

  @Post()
  create(@Body() createProductTranslationDto: CreateProductTranslationDto) {
    return this.productTranslationsService.create(createProductTranslationDto);
  }

  @Get()
  findAll() {
    return this.productTranslationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTranslationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductTranslationDto: UpdateProductTranslationDto) {
    return this.productTranslationsService.update(+id, updateProductTranslationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTranslationsService.remove(+id);
  }
}
