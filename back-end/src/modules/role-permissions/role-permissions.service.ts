import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermission } from '@/entities/role_permissions.entity';
import { In, Repository } from 'typeorm';
import { Permission, Role } from '@/entities';
import { CreatesDto } from './dto/creates-all.dto';
import { asapScheduler } from 'rxjs';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async create(createRolePermissionDto: CreateRolePermissionDto) {
    // ✅ validate
    if (
      !createRolePermissionDto.roleId ||
      !createRolePermissionDto.permissionId
    ) {
      throw new BadRequestException('roleId and permissionId are required');
    }

    // ✅ check role
    const exitRolePermission = await this.roleRepository.findOneBy({
      id: createRolePermissionDto.roleId,
    });

    if (!exitRolePermission) {
      throw new BadRequestException('roleId is not exist');
    }

    // ✅ check permission
    const exitPermission = await this.permissionRepository.findOneBy({
      id: createRolePermissionDto.permissionId,
    });

    if (!exitPermission) {
      throw new BadRequestException('permissionId is not exist');
    }

    // ✅ create đúng relation
    const newRolePermission = this.rolePermissionRepository.create({
      role: { id: createRolePermissionDto.roleId },
      permission: { id: createRolePermissionDto.permissionId },
      assignedBy: createRolePermissionDto.assignedBy,
    });

    return await this.rolePermissionRepository.save(newRolePermission);
  }
  async create_allRolePermissions(createRolePermissionDtos: CreatesDto) {
    // ✅ validate
    if (
      !createRolePermissionDtos.roleId ||
      !createRolePermissionDtos.permissionId?.length
    ) {
      throw new BadRequestException('roleId and permissionId are required');
    }

    const exitRolePermission = await this.roleRepository.findOne({
      where: { id: createRolePermissionDtos.roleId },
    });

    if (!exitRolePermission) {
      throw new BadRequestException('roleId is not exist');
    }

    const exitPermissions = await this.permissionRepository.find({
      where: {
        id: In(createRolePermissionDtos.permissionId),
      },
    });

    if (
      exitPermissions.length !== createRolePermissionDtos.permissionId.length
    ) {
      throw new BadRequestException('One or more permissionIds are not exist');
    }

    const newRolePermissions = createRolePermissionDtos.permissionId.map(
      (p) => {
        return this.rolePermissionRepository.create({
          role: { id: createRolePermissionDtos.roleId },
          permission: { id: p },
          assignedBy: createRolePermissionDtos.assignedBy,
        });
      },
    );

    return await this.rolePermissionRepository.save(newRolePermissions);
  }
  findAll() {
    return `This action returns all rolePermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolePermission`;
  }

  update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
    return `This action updates a #${id} rolePermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolePermission`;
  }
}
