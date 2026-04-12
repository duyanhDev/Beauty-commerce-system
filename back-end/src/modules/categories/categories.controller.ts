import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryTranslationDto } from '../category_translations/dto/create-category_translation.dto';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { QueryDto } from '@/shared/queryDto.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Tạo categories thành công' })
  @ApiResponse({ status: 404, description: 'Tạo categories thất bại' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Body() dtoTranslation: CreateCategoryTranslationDto[],
  ) {
    const result = await this.categoriesService.create(createCategoryDto);

    return {
      EC: 0,
      message: 'Tạo categories thành công',
      data: result,
    };
  }

  @Get()
  async findAll(@Query() dto: QueryDto) {
    const data = await this.categoriesService.findAll(dto);

    return {
      EC: 0,
      message: 'Tạo categories thành công',
      data: data,
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const result = await this.categoriesService.findOne(slug);

    return {
      EC: 0,
      message: 'Lấy thành công category',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.categoriesService.update(+id, updateCategoryDto);

    return {
      EC: 0,
      message: 'Update thành công category',
      data: result,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
