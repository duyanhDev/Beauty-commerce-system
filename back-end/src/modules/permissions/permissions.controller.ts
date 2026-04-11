import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { QueryDto } from '@/dto/query.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo dữ liệu thành công' })
  @ApiResponse({ status: 400, description: 'Tạo dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    const result = await this.permissionsService.create(createPermissionDto);

    return {
      EC: 0,
      message: 'Tạo permissions thành công',
      data: result,
    };
  }

  @Get()
  @ApiResponse({ status: 201, description: 'Lấy dữ liệu thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async findAll(@Query() QueryDto: QueryDto) {
    const data = await this.permissionsService.findAll(QueryDto);

    return {
      EC: 0,
      message: 'Lấy dự liệu permissions thành công',
      data: data,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Lấy dữ liệu thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async findOne(@Param('id') id: number) {
    const data = await this.permissionsService.findOne(id);

    return {
      EC: 0,
      message: 'Lấy thông tin chi tiết permission thành công',
      data: data,
    };
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Lấy dữ liệu thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    const data = await this.permissionsService.update(id, updatePermissionDto);

    return {
      EC: 0,
      message: 'Cập nhật thông tin permission thành công',
      data: data,
    };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Xóa dự liệu thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async remove(@Param('id') id: number) {
    const data = await this.permissionsService.remove(id);

    return {
      EC: 0,
      message: 'Lấy thông tin chi tiết permission thành công',
      data: data,
    };
  }
}
