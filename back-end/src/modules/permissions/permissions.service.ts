import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '@/entities';
import { Repository } from 'typeorm';
import { QueryDto } from '@/dto/query.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly repoPermission: Repository<Permission>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    if (
      createPermissionDto.name.trim() === ' ' ||
      createPermissionDto.description.trim() === ''
    ) {
      throw new BadRequestException('Vui lòng nhập đầy đủ tên trường ');
    }
    const nameExits = await this.repoPermission.findOne({
      where: { name: createPermissionDto.name },
    });

    if (nameExits) {
      throw new BadRequestException('Tên quyền đã tồn tại ');
    }

    const permissions = this.repoPermission.create(createPermissionDto);

    return await this.repoPermission.save(permissions);
  }

  async findAll({ page = 1, limit = 10, sort, sortBy, q }: QueryDto) {
    const qb = this.repoPermission.createQueryBuilder('permission');

    const sortQuery = sort || 'ASC';

    const sortByQuery = sortBy || 'id';

    if (q) {
      qb.andWhere('permission.name like :q', { q: `%${q}%` });
    }

    qb.skip((page - 1) * limit)
      .take(limit)
      .orderBy(`${sortByQuery}`, sortQuery);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  async findOne(id: number) {
    const permission = await this.repoPermission.findOneBy({ id: id });

    if (!permission) {
      throw new NotFoundException('Không tìm thấy permissions này!');
    }

    return permission;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    if (!id) {
      throw new BadRequestException('Vui lòng truyền id vô params'!);
    }

    const permissionExit = await this.repoPermission.findOne({
      where: { id: id },
    });

    if (!permissionExit) {
      throw new NotFoundException('Không tồn tại permission này!');
    }

    const result = this.repoPermission.merge(
      permissionExit,
      updatePermissionDto,
    );

    return await this.repoPermission.save(result);
  }

  async remove(id: number) {
    const permissionExit = await this.repoPermission.findOneBy({ id: id });

    if (!permissionExit) {
      throw new NotFoundException('Không tìm thấy permission này!');
    }

    return await this.repoPermission.remove(permissionExit);
  }
}
