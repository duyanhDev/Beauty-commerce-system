import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { QueryDto } from '@/dto/query.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { Permissions } from '@/common/decorators';
import { RolesGuard } from '@/common/guards/roles.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async create(@Body() createRoleDto: CreateRoleDto) {
    const data = await this.rolesService.create(createRoleDto);
    return {
      EC: 0,
      message: 'Tạo mới quyền thành công',
      data: data,
    };
  }

  @Permissions('user:read')
  @Get()
  @ApiResponse({ status: 201, description: 'Lấy dữ liệu thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async findAll(@Query() queryDTO: QueryDto) {
    const result = await this.rolesService.findAll(queryDTO);

    return {
      EC: 0,
      message: result?.data.length === 0 ? 'Không tìm thấy dữ liệu' : 'Success',
      data: result,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
  @ApiResponse({ status: 400, description: 'ID không hợp lệ' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy quyền' })
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    const data = await this.rolesService.update(id, updateRoleDto);
    return {
      EC: 0,
      message: 'Cập nhật quyền thành công',
      data: data,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
