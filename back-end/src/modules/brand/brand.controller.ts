import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BrandService } from './brand.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Tạo thành công thương hiệu ' })
  @ApiResponse({ status: 404, description: 'Lỗi không truyền name  ' })
  @ApiResponse({ status: 500, description: 'Lỗi máy chủ ' })
  async createBrand(@Body('name') name: string) {
    const data = await this.brandService.createBrand(name);

    return {
      EC: 0,
      message: 'Tạo mới thành công',
      data: data,
    };
  }

  @Get()
  async getAllBrand() {
    const data = await this.brandService.getAllBrand();

    return {
      EC: 0,
      message: 'Lấy danh sách thành công',
      data: data,
    };
  }

  @Get(':id')
  async getByIdBrand(@Param('id') id: number) {
    const data = await this.brandService.getByIdBrand(id);
    return {
      EC: 0,
      message: `Lấy thông tin sản phẩm có id ${id} thành công`,
      data: data,
    };
  }
}
