import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { CreatesDto } from './dto/creates-all.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(
    private readonly rolePermissionsService: RolePermissionsService,
  ) {}

  @Post('create-role-permission')
  async create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    console.log(typeof createRolePermissionDto.roleId);

    const data = await this.rolePermissionsService.create(
      createRolePermissionDto,
    );

    return {
      EC: 0,
      message: 'Role permission created successfully',
      data: data,
    };
  }

  @Get()
  findAll() {
    return this.rolePermissionsService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'The role permissions have been successfully created.',
  })
  @ApiResponse({
    status: 404,
    description: 'The role permissions were not found.',
  })
  @Post('create-all-role-permissions')
  async createAll(@Body() createRolePermissionDtos: CreatesDto) {
    const result = await this.rolePermissionsService.create_allRolePermissions(
      createRolePermissionDtos,
    );
    return {
      EC: 0,
      message: 'Role permissions created successfully',
      data: result,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolePermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRolePermissionDto: UpdateRolePermissionDto,
  ) {
    return this.rolePermissionsService.update(+id, updateRolePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolePermissionsService.remove(+id);
  }
}
