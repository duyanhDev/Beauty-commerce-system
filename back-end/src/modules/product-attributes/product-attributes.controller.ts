import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product-attributes')
export class ProductAttributesController {
  constructor(private readonly productAttributesService: ProductAttributesService) { }

  @Post()
  @ApiResponse({ status: 200, description: "Tạo mới atrribute thành công" })
  @ApiResponse({ status: 404, description: "Lỗi khi tạo phiếu" })
  @ApiResponse({ status: 500, description: "Lỗi server" })

  @Roles('admin')
  async create(@Body() createProductAttributeDto: CreateProductAttributeDto) {
    const data = await this.productAttributesService.create(createProductAttributeDto);

    return {
      EC: 0,
      message: "Tạo mới attribute thành công",
      data: data,
    }
  }

  @Get()
  async findAll() {
    const data = await this.productAttributesService.findAll();

    return {
      EC: 0,
      message: "Lấy danh sách atrribute thành công",
      data: data,
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productAttributesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductAttributeDto: UpdateProductAttributeDto) {
    return this.productAttributesService.update(+id, updateProductAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productAttributesService.remove(+id);
  }
}
