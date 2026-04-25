import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { countTryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private countrySerive: countTryService) {}

  @Post()
  async create(@Body('name') name: string) {
    const data = await this.countrySerive.createCountry(name);

    return {
      EC: 0,
      message: 'Tạo quốc gia thành công',
      data: data,
    };
  }
  @Get()
  async getAllCountrys() {
    const data = await this.countrySerive.getAllCountry();

    return {
      EC: 0,
      message: 'Lấy thành công tất cả danh sách quốc gia',
      data: data,
    };
  }

  @Get(':id')
  async getCountryById(@Param('id') id: number) {
    const data = await this.countrySerive.getCountryById(id);

    return {
      EC: 0,
      message: `Lấy thành công quốc gia theo id ${id}`,
      data: data,
    };
  }

  @Put('id')
  async update(@Param('id') id: number, @Body('name') name: string) {
    const data = await this.countrySerive.updateCountry(id, name);

    return {
      EC: 0,
      message: 'Cập nhật thành công tên quốc gia ',
      data: data,
    };
  }

  @Delete('id')
  async delete(@Param('id') id: number) {
    const data = await this.countrySerive.deleteCountry(id);

    return {
      EC: 0,
      message: 'Xóa thành công quốc gia ',
      data: data,
    };
  }
}
